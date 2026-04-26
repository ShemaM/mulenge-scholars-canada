"use server";

import { getCachedPayload } from "@/lib/payload";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const ContactSchema = z.object({
  firstName: z.string().trim().min(2, "First name is too short").max(50, "First name is too long"),
  lastName:  z.string().trim().min(2, "Last name is too short").max(50, "Last name is too long"),
  email:     z.string().trim().email("Please enter a valid email address").toLowerCase(),
  phone:     z.string().trim().regex(/^[+]*[()\d{1,4}?.\/-\s]*$/, "Invalid phone format").optional().or(z.literal('')),
  subject:   z.string().max(100).default("General Inquiry"),
  message:   z.string().trim().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
  _honeypot: z.string().max(0, { message: "Spam detected" }).optional(),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    await checkRateLimit();
  } catch {
    return { success: false, message: "Too many requests. Please wait a moment before trying again." };
  }

  const rawData = Object.fromEntries(formData.entries());

  if (rawData._honeypot && rawData._honeypot !== "") {
    return { success: true, message: "Your message has been dispatched." };
  }

  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors[0].message || "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, subject, message, phone } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`;

  try {
    const payload = await getCachedPayload();

    await payload.create({
      collection: 'messages',
      data: {
        name: fullName,
        email,
        subject,
        message: phone ? `[Phone: ${phone}]\n\n${message}` : message,
        status: 'unread',
      },
    });

    return {
      success: true,
      message: "Your message has been dispatched to the MSNC Leadership Board. Expect a response within 24-48 hours.",
    };
  } catch (error: any) {
    console.error("Contact form error");
    if (error.message?.includes('not found')) {
      return { success: false, message: "Server configuration error. Please try again later." };
    }
    return { success: false, message: "Our system is currently at capacity. Please email info@mulengescholars.org directly." };
  }
}
