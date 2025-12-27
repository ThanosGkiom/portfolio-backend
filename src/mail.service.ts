import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { Contact } from './Contact/contact.entity';

@Injectable()
export class MailService {
    private resend = new Resend(process.env.RESEND_API_KEY);

    async sendMail(contact: Contact) {
        const { data, error } = await this.resend.emails.send({
            from: `${process.env.APP_NAME} <no-reply@${process.env.APP_DOMAIN}>`,
            to: [process.env.APP_EMAIL],
            subject: 'New Contact Form Submission',
            html: `
            <p>Name: ${contact.name}</p>
            <p>Message: ${contact.message}</p>
            <p>Company: ${contact?.company}</p>
            <p>Email: ${contact.email}</p>
            `,
        });

        if (error) {
            throw new Error(error.message);
        }

        return data?.id;
    }
}
