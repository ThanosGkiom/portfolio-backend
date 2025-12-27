import { Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { Response } from 'src/response.interface';
import { MailService } from 'src/mail.service';

@Injectable()
export class ContactService {
    constructor(private readonly mailService: MailService) {}

    async create(createContactDto: CreateContactDto): Promise<Response> {
        await this.mailService.sendMail(createContactDto);

        return {
            success: true,
            message:
                'Thanks for your message. I will get back to you as soon as possible.',
        };
    }
}
