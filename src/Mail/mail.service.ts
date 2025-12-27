import {
    Injectable,
    InternalServerErrorException,
    Logger,
} from '@nestjs/common';
import { Resend } from 'resend';
import { CreateContactDto } from '../Contact/dto/create-contact.dto';

@Injectable()
export class MailService {
    private readonly resend = new Resend(process.env.RESEND_API_KEY);
    private readonly logger = new Logger(MailService.name);

    async sendMail(contact: CreateContactDto): Promise<string> {
        try {
            const { data, error } = await this.resend.emails.send({
                from: `${process.env.APP_NAME} <onboarding@resend.dev>`,
                to: [process.env.APP_EMAIL],
                subject: `New Lead: ${contact.name}`,
                html: `
          <strong>Name:</strong> ${contact.name}<br>
          <strong>Email:</strong> ${contact.email}<br>
          <strong>Company:</strong> ${contact.company ?? 'N/A'}<br>
          <strong>Message:</strong> <br>
          <p>${contact.message}</p>
          `,
            });

            if (error) {
                this.logger.error(`Resend API Error: ${error.message}`);
                throw new InternalServerErrorException('Failed to send email');
            }

            return data.id;
        } catch (err: unknown) {
            const stack = err instanceof Error ? err.stack : undefined;
            this.logger.error('Unexpected Mailer Failure', stack);
            throw err;
        }
    }
}
