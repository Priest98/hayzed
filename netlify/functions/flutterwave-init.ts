import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    const { email, amount, metadata } = JSON.parse(event.body || "{}");

    if (!email || !amount) {
        return { statusCode: 400, body: "Email and amount are required" };
    }

    const SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!SECRET_KEY) {
        return { statusCode: 500, body: "Flutterwave Secret Key is missing in environment variables" };
    }

    try {
        const response = await fetch("https://api.flutterwave.com/v3/payments", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                tx_ref: `flw_ref_${Date.now()}_${Math.floor(Math.random() * 1000000)}`,
                amount: amount,
                currency: "NGN",
                redirect_url: `${process.env.URL || "http://localhost:8888"}/payment-success`,
                customer: {
                    email: email,
                    name: metadata?.full_name || "Customer",
                },
                meta: metadata,
                customizations: {
                    title: "Hayzed Apparel",
                    description: "Payment for order",
                },
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
