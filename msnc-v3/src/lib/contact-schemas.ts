import { z } from "zod";

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[] | undefined>;
};

export const ContactSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name is too short")
    .max(50, "First name is too long"),
  lastName: z
    .string()
    .trim()
    .min(2, "Last name is too short")
    .max(50, "Last name is too long"),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .toLowerCase(),
  phone: z
    .string()
    .trim()
    .regex(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, "Invalid phone format")
    .optional()
    .or(z.literal("")),
  subject: z.string().min(1, "Subject is required").default("General Inquiry"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message is too long"),
  _honeypot: z.string().max(0, "Spam detected").optional(),
});

export const NewsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address")
    .toLowerCase(),
  _honeypot: z.string().max(0, "Spam detected").optional(),
});

