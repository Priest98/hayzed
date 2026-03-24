import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
    const reference = event.queryStringParameters?.reference;

    if (!reference) {
        return { statusCode: 400, body: "Reference is required" };
    }

    const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

    if (!SECRET_KEY) {
        return { statusCode: 500, body: "Paystack Secret Key is missing" };
    }

    try {
        const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            headers: {
                Authorization: `Bearer ${SECRET_KEY}`,
            },
        });

        const data = await response.json();

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed to verify transaction" }) };
    }
};

export { handler };
