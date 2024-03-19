// src/pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    // Extract data from the request body
    const { firstname, lastname, email, password } = req.body;

    // Here, you would add logic to save the user to your database
    // Example: await saveUserToDatabase({ firstname, lastname, email, password });
    console.log({ firstname, lastname, email, password }); // Log to see the data

    // Configure nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or another email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender address
      to: email, // List of receivers
      subject: 'Registration Confirmation', // Subject line
      text: `Hi ${firstname},\n\nThank you for registering with us.`, // Plain text body
      // html: '<b>Hello world?</b>' // html body
    };

    // Send email
    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: 'Registration successful and email sent' });
    } catch (error) {
      console.error('Email sending error:', error);
      res.status(500).json({ message: 'Registration successful but failed to send email' });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
