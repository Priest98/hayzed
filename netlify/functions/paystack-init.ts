import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { email, amount, metadata } = JSON.parse(event.body || "{}");

    if (!email || !amount) {
        return { statusCode: 400, body: "Email and amount are required" };
    }

    const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!SECRET_KEY) {
        return { statusCode: 500, body: "Paystack Secret Key is missing in environment variables" };
    }

    try {
        const response = await fetch("https://api.paystack.co/transaction/initialize", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                amount: Math.round(amount * 100), // convert to kobo
                metadata,
                callback_url: `${process.env.URL || "http://localhost:8888"}/payment-success`,
            }),
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to initialize transaction" }) };
    }
};

export { handler };
