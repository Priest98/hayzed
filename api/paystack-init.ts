import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).send('Method Not Allowed');
  }

  const { email, amount, metadata } = request.body;

  if (!email || !amount) {
    return response.status(400).send('Email and amount are required');
  }

  const SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

  if (!SECRET_KEY) {
    return response.status(500).send('Paystack Secret Key is missing in environment variables');
  }

  try {
    const paystackResponse = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // convert to kobo
        metadata,
        callback_url: `${process.env.VERCEL_URL ? 'https://' + process.env.VERCEL_URL : 'http://localhost:3000'}/payment-success`,
      }),
    });

    const data = await paystackResponse.json();

    return response.status(200).json(data);
  } catch (error) {
    return response.status(500).json({ error: 'Failed to initialize transaction' });
  }
}
