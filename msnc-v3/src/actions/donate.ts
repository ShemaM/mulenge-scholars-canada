"use server";

import { getCachedPayload } from "@/lib/payload";
import { z } from "zod";

// 1. Validation Schema
const DonateSchema = z.object({
  amount: z.coerce
    .number()
    .min(5, "Minimum contribution is $5")
    .max(50000, "For contributions over $50,000, please contact our board directly."),
  tier: z.string().optional(),
});

export async function initiateDonation(prevState: any, formData: FormData) {
  const rawAmount = formData.get("amount");
  const tier = formData.get("tier");
  const donorName = formData.get("name");
  const email = formData.get("email");

  // 2. Validate
  const validatedFields = DonateSchema.safeParse({
    amount: rawAmount,
    tier: tier,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please enter a valid investment amount.",
    };
  }

  const { amount } = validatedFields.data;

  try {
    const payload = await getCachedPayload();

    // 3. Log the "Intent to Donate" in Payload
    // This allows you to track abandoned "carts" or follow up with major donors
    await payload.create({
      collection: 'donations',
      data: {
        amount,
        tier: tier || 'custom',
        status: 'pending',
        donorName: donorName ? String(donorName) : undefined,
        email: email ? String(email) : undefined,
      },
    });

    console.log(`[Donate Action] High-Value Intent: $${amount} for ${tier || 'Custom'} tier`);

    /**
     * 4. STRIPE INTEGRATION (Future Step)
     * Here is where you would call the Stripe API to create a Checkout Session:
     * const session = await stripe.checkout.sessions.create({...});
     * return { success: true, redirectUrl: session.url };
     */

    // Simulate processing for the editorial feel
    await new Promise((resolve) => setTimeout(resolve, 1200));

    return {
      success: true,
      message: "Secure portal initialized. Redirecting to payment gateway...",
      // For now, we simulate a redirect
      redirectUrl: "https://donate.stripe.com/example", 
    };

  } catch (error) {
    console.error("Donation Portal Error:", error);
    return {
      success: false,
      message: "The secure server is currently undergoing maintenance. Please try again in a few minutes.",
    };
  }
}
