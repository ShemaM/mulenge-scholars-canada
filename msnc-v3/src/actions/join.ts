"use server";

import { z } from "zod";
import { getPayload } from "payload";
import config from "@payload-config";
import { checkRateLimit } from "@/lib/rate-limit";

const JoinSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required.").max(50),
  lastName: z.string().trim().min(1, "Last name is required.").max(50),
  email: z.string().trim().email("Please enter a valid email address."),
  interest: z.enum(["volunteer", "scholar", "partner", "support", "general"]),
  message: z.string().trim().min(10, "Please add at least 10 characters about your goals.").max(5000),
});

export async function submitJoinApplication(prevState: any, formData: FormData) {
  try {
    await checkRateLimit();
  } catch {
    return {
      success: false,
      message: "Too many requests. Please wait a moment before trying again.",
    };
  }

  const validatedFields = JoinSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    interest: formData.get("interest"),
    message: formData.get("message"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please review the form. Some fields need attention.",
    };
  }

  const { firstName, lastName, email, interest, message } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`.trim();

  try {
    const payload = await getPayload({ config });

    await payload.create({
      collection: "join-submissions",
      data: {
        fullName,
        email,
        interest,
        message,
        status: "new",
      },
    });

    return {
      success: true,
      message: "Application received. Our leadership team will reach out within 2-3 business days.",
    };
  } catch (error) {
    console.error("Join submission error:", error);
    return {
      success: false,
      message: "We could not submit right now. Please try again in a few minutes.",
    };
  }
}
