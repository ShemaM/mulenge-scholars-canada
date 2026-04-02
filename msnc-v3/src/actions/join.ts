"use server";

import { getCachedPayload } from "@/lib/payload";
import { z } from "zod";

const JoinSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  interest: z.enum(["volunteer", "scholar"]),
  message: z.string().min(10, "Please add at least 10 characters about your goals."),
});

export async function submitJoinApplication(prevState: any, formData: FormData) {
  const rawData = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    interest: formData.get("interest"),
    message: formData.get("message"),
  };

  const validatedFields = JoinSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please review the form. Some fields need attention.",
    };
  }

  const { firstName, lastName, email, phone, interest, message } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`.trim();
  const resolvedMessage = phone ? `Phone: ${phone}\n\n${message}` : message;

  try {
    const payload = await getCachedPayload();

    await payload.create({
      collection: "join-submissions",
      data: {
        fullName,
        email,
        phone,
        interest,
        message: resolvedMessage,
        status: "new",
      },
    });

    return {
      success: true,
      message: "Application received. Our leadership team will reach out within 2-3 business days.",
    };
  } catch (error) {
    console.error("Join Submission Error:", error);
    return {
      success: false,
      message: "We could not submit right now. Please try again in a few minutes.",
    };
  }
}
