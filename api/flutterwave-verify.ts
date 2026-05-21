import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const transactionId = request.query.transaction_id as string;

  if (!transactionId) {
    return response.status(400).send('Transaction ID is required');
  }

  const SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY;

  if (!SECRET_KEY) {
    return response.status(500).send('Flutterwave Secret Key is missing');
  }

  try {
    const flwResponse = await fetch(`https://api.flutterwave.com/v3/transactions/${transactionId}/verify`, {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    });

    const data = await flwResponse.json();

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Failed to verify transaction' });
  }
}
