import { Handler } from "@netlify/functions";

const handler: Handler = async (event) => {
    const transactionId = event.queryStringParameters?.transaction_id;

    if (!transactionId) {
        return { statusCode: 400, body: "Transaction ID is required" };
    }

    const SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

    if (!SECRET_KEY) {
        return { statusCode: 500, body: "Flutterwave Secret Key is missing" };
    }

    try {
        const response = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
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
