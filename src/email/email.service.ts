import nodemailer from 'nodemailer';
import { transporterOptions } from './config.js';

export class EmailService {

    private static instance: EmailService | null = null;
    private transporter: nodemailer.Transporter;

    private constructor() {
        this.transporter = nodemailer.createTransport(transporterOptions);
    }

    public static getInstance(): EmailService {
        if (EmailService.instance === null) {
            EmailService.instance = new EmailService();
        }
        return EmailService.instance;
    }

    async sendEmail({ to, subject, body }: { to: string; subject: string; body: string; }) {
        console.log('Sending email to:', to);
        const info = await this.transporter.sendMail({
            from: `"Weather Service" <${transporterOptions.auth.user}>`,
            to,
            subject,
            text: body,
        });

        console.log('Message sent: %s', info.messageId);
    }
}