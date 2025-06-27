"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function signUpForNewsletter(email: string) {
    try {
        // Add the email to your Resend audience
        // Replace 'your-audience-id' with your actual Resend audience ID
        const result = await resend.contacts.create({
            email,
            audienceId: process.env.RESEND_AUDIENCE_ID!,
        });

        if (result.error) {
            console.error("Error adding to newsletter:", result.error);
            return {
                success: false,
                error: "Failed to subscribe to newsletter",
            };
        }

        return { success: true, data: result.data };
    } catch (error) {
        console.error("Newsletter signup error:", error);
        return { success: false, error: "Failed to subscribe to newsletter" };
    }
}
