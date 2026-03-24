import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== 'POST') {
    return response.status(405).send('Method Not Allowed');
  }

  try {
    const formData = request.body;

    // Log the submission
    console.log('Form Submission Received:', formData);

    return response.status(200).json({
      success: true,
      message: 'Thank you for your submission. We have received it and will get back to you soon.',
    });
  } catch (error) {
    return response.status(400).send('Invalid request body');
  }
}
