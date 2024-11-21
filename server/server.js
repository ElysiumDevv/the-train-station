const express = require('express');
const sgMail = require('@sendgrid/mail');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('Setting up routes...');

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Test route
app.get('/', (req, res) => {
    console.log('Root route accessed');
    res.json({ message: 'Server is running!' });
});

// Test email route
app.get('/test-email', async (req, res) => {
    console.log('Test email route accessed');
    
    const msg = {
        to: 'info@thetrainstationcorbin.com',
        from: 'info@thetrainstationcorbin.com', // This needs to be verified in SendGrid
        subject: 'Test Email from The Train Station',
        text: 'This is a test email from your website contact form.',
        html: '<strong>This is a test email from your website contact form.</strong>'
    };

    try {
        console.log('Attempting to send test email...');
        const response = await sgMail.send(msg);
        console.log('SendGrid Response:', response);
        res.json({ 
            message: 'Test email sent successfully!',
            response: response
        });
    } catch (error) {
        console.error('SendGrid Error:', error);
        if (error.response) {
            console.error('Error body:', error.response.body);
        }
        res.status(500).json({ 
            error: 'Failed to send test email', 
            details: error.message,
            body: error.response?.body
        });
    }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
    console.log('Contact form submission received:', req.body);
    const { name, email, inquiryType, message } = req.body;

    const msg = {
        to: 'info@thetrainstationcorbin.com',
        from: 'info@thetrainstationcorbin.com', // This needs to be verified in SendGrid
        subject: `${inquiryType} Inquiry from ${name}`,
        text: `
Name: ${name}
Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${message}
        `,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>From:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Inquiry Type:</strong> ${inquiryType}</p>
            <h3>Message:</h3>
            <p>${message}</p>
        `,
        replyTo: email
    };

    try {
        console.log('Attempting to send email...');
        const response = await sgMail.send(msg);
        console.log('SendGrid Response:', response);
        res.json({ 
            message: 'Email sent successfully!',
            response: response
        });
    } catch (error) {
        console.error('SendGrid Error:', error);
        if (error.response) {
            console.error('Error body:', error.response.body);
        }
        res.status(500).json({ 
            error: 'Failed to send email', 
            details: error.message,
            body: error.response?.body
        });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('SendGrid API Key:', process.env.SENDGRID_API_KEY ? 'Set' : 'Not set');
});
