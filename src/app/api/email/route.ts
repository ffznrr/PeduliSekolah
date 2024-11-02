import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';

export async function POST(req: Request) {
  try {
    const { subject, message } = await req.json();

    // Initialize Mailjet client with API Key and Secret
    const mailjetClient = mailjet.apiConnect(
      process.env.MAILJET_API_KEY as string,
      process.env.MAILJET_API_SECRET as string
    );

    // Send email using Mailjet API
    const request = await mailjetClient.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: {
            Email: process.env.MAILJET_SENDER_EMAIL,
            Name: 'PeduliSekolah',
          },
          To: [
            {
              Email: "sasaputri0705@gmail.com",
            },
          ],
          Subject: subject,
          TextPart: message,
        },
      ],
    });

    return NextResponse.json({
      message: 'Email sent successfully!',
      info: request.body,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { message: 'Failed to send email', error },
      { status: 500 }
    );
  }
}
