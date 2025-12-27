import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { CreateContactDto } from './dto/create-contact.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Response } from 'src/response.interface';

@Injectable()
export class ContactService {
    constructor(
        @InjectRepository(Contact)
        private readonly contactRepository: Repository<Contact>,
    ) {}

    async create(createContactDto: CreateContactDto): Promise<Response> {
        const newContact = this.contactRepository.create(createContactDto);
        await this.contactRepository.save(newContact);

        return {
            success: true,
            message:
                'Thanks for your message. I will get back to you as soon as possible.',
        };
    }

    async findAll(): Promise<Contact[]> {
        return await this.contactRepository.find();
    }
}
