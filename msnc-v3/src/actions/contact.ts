"use server";

import { getCachedPayload } from "@/lib/payload";
import { z } from "zod"; // Recommended for robust validation

// 1. Define a Schema for Validation
const ContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid academic or personal email."),
  subject: z.string().min(5, "Please provide a brief subject."),
  message: z.string().min(10, "Your narrative must be at least 10 characters."),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  // Extract data from the form
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
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

  const { name, email, subject, message } = validatedFields.data;

  try {
    // 3. Connect to Payload
    const payload = await getCachedPayload();

    /**
     * NOTE: Ensure you have a 'messages' collection in Payload.
     * If not, this block will throw an error. For now, we simulate success.
     */
    
    /* UNCOMMENT THIS WHEN COLLECTION IS READY:
    await payload.create({
      collection: 'messages',
      data: {
        name,
        email,
        subject,
        message,
        status: 'unread',
        receivedAt: new Date().toISOString(),
      },
    });
    */

    // Simulate network latency for a premium feel
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(`[Contact Action] New Dispatch from ${name} (${email})`);

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