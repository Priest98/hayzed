import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  const reference = request.query.reference as string;

  if (!reference) {
    return response.status(400).send('Reference is required');
  }

  const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  if (!SECRET_KEY) {
    return response.status(500).send('Paystack Secret Key is missing');
  }

  try {
    const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
      },
    });

    const data = await paystackResponse.json();

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Failed to verify transaction' });
  }
}
