"use server";

import { getCachedPayload } from "@/lib/payload";
import { z } from "zod";
import { headers } from "next/headers";

// 1. Define a Strict Schema for Validation
const ContactSchema = z.object({
  firstName: z.string()
    .trim()
    .min(2, "First name is too short")
    .max(50, "First name is too long"),
  lastName: z.string()
    .trim()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long"),
  email: z.string()
    .trim()
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z.string()
    .trim()
    .regex(/^[+]*[()\d{1,4}?.\/-\s]*$/, "Invalid phone format")
    .optional()
    .or(z.literal('')), // Allows empty string
  subject: z.string().default("General Inquiry"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  // Honeypot field must be empty
  _honeypot: z.string().max(0, { message: "Spam detected" }).optional(),
});

export async function submitContactForm(prevState: any, formData: FormData) {
  // 2. Extract and sanitize data
  const rawData = Object.fromEntries(formData.entries());

  // 3. Honeypot check (Immediate exit for bots)
  if (rawData._honeypot && rawData._honeypot !== "") {
    console.warn("Honeypot triggered by bot.");
    // We return success to fool the bot into thinking it worked
    return {
      success: true,
      message: "Your message has been dispatched.",
    };
  }

  // 4. Validate with Zod
  const validatedFields = ContactSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      // Return the first error message or a generic one
      message: validatedFields.error.errors[0].message || "Invalid form data.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { firstName, lastName, email, subject, message, phone } = validatedFields.data;
  const fullName = `${firstName} ${lastName}`;

  try {
    const payload = await getCachedPayload();
    
    // Get IP address for basic rate-limiting logs (optional)
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for") || "unknown";

    // 5. Create the record in Payload CMS
    // Ensure the 'messages' collection exists in your Payload config
    await payload.create({
      collection: 'messages',
      data: {
        name: fullName, // Mapping UI firstName+lastName to Payload 'name'
        email,
        subject,
        message: phone ? `[Phone: ${phone}]\n\n${message}` : message,
        status: 'unread',
      },
    });

    // Logging (without sensitive data if required by privacy laws)
    console.info(`[Contact] Form submitted by ${email} from IP ${ip}`);

    // Simulate natural processing time
    await new Promise((resolve) => setTimeout(resolve, 600));

    return {
      success: true,
      message: "Your message has been dispatched to the MSNC Leadership Board. Expect a response within 24-48 hours.",
    };

  } catch (error: any) {
    // 6. Detailed Error Logging
    console.error("Payload CMS Error:", error);

    // Check if the error is specifically because the collection doesn't exist
    if (error.message?.includes('not found')) {
       return {
         success: false,
         message: "Server Configuration Error: The messages collection is missing.",
       };
    }

    return {
      success: false,
      message: "Our digital dispatch system is currently at capacity. Please email info@msnc.ca directly.",
    };
  }
}