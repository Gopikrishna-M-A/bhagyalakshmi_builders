import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const mailId = process.env.MAIL_ID

export async function POST(request) {
  try {
    // Get form data from request
    const { firstName, lastName, email, phone, message } = await request.json();
    console.log("firstName, lastName, email, phone, message",firstName, lastName, email, phone, message);
    

    // Validate required fields
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create email content
    const emailContent = `
      New Enquiry from Bhagyalakshmi Builders Website

      Contact Details:
      ----------------
      Name: ${firstName} ${lastName}
      Email: ${email}
      Phone: ${phone}
      
      Message:
      --------
      ${message || 'No message provided'}
    `;

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Bhagyalakshmi Builders <enquiries@bhagyalakshmibuilders.com>', // Replace with your verified domain
      to: mailId, // Replace with actual owner's email
      subject: `New Enquiry from ${firstName} ${lastName}`,
      text: emailContent,
      // You can also use HTML template
      html: `
        <h2>New Enquiry from Bhagyalakshmi Builders Website</h2>
        <h3>Contact Details:</h3>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <h3>Message:</h3>
        <p>${message || 'No message provided'}</p>
      `,
    });
    console.log('data',data);
    

    return NextResponse.json(
      { message: 'Email sent successfully', data },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Error sending email' },
      { status: 500 }
    );
  }
}