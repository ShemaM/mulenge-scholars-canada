"use server";

import { getCachedPayload } from "@/lib/payload";
import { z } from "zod"; // Recommended for robust validation

// 1. Define a Schema for Validation
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").optional(),
  firstName: z.string().min(2, "First name must be at least 2 characters.").optional(),
  lastName: z.string().min(2, "Last name must be at least 2 characters.").optional(),
  email: z.string().email("Please enter a valid academic or personal email."),
  subject: z.string().min(3, "Please provide a brief subject.").optional(),
  message: z.string().min(10, "Your narrative must be at least 10 characters."),
  phone: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.name && !(data.firstName && data.lastName)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["name"],
      message: "Please provide your full name.",
    });
  }
});

export async function submitContactForm(prevState: any, formData: FormData) {
  // Extract data from the form
  const rawData = {
    name: formData.get("name"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
    phone: formData.get("phone"),
  };

  // 2. Validate with Zod
  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please refine your narrative. Some fields require attention.",
    };
  }

  const { name, firstName, lastName, email, subject, message, phone } = validatedFields.data;
  const resolvedName = name?.trim() || `${firstName || ""} ${lastName || ""}`.trim();
  const resolvedSubject = subject?.trim() || "General Inquiry";
  const resolvedMessage = phone ? `Phone: ${phone}\n\n${message}` : message;

  try {
    // 3. Connect to Payload
    const payload = await getCachedPayload();

    /**
     * NOTE: Ensure you have a 'messages' collection in Payload.
     * If not, this block will throw an error. For now, we simulate success.
     */
    
    await payload.create({
      collection: 'messages',
      data: {
        name: resolvedName,
        email,
        subject: resolvedSubject,
        message: resolvedMessage,
        status: 'unread',
      },
    });

    // Simulate network latency for a premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(`[Contact Action] New Dispatch from ${resolvedName} (${email})`);

    return {
      success: true,
      message: "Your message has been dispatched to the MSNC Leadership Board. Expect a response within 24-48 hours.",
    };

  } catch (error) {
    console.error("Critical Action Error:", error);
    return {
      success: false,
      message: "Our digital dispatch system is currently at capacity. Please email info@msnc.ca directly.",
    };
  }
}
