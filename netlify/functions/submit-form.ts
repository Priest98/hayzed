import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const formData = JSON.parse(event.body || "{}");

        // Log the submission (Netlify logs show this)
        console.log("Form Submission Received:", formData);

        // In a real app, you might send an email here using SendGrid/Mailgun
        // For now, we return success

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                success: true,
                message: "Thank you for your submission. We have received it and will get back to you soon."
            }),
        };
    } catch (error) {
        return { statusCode: 400, body: "Invalid request body" };
    }
};

export { handler };
