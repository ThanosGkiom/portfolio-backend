import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailModule } from '../Mail/mail.module';

@Module({
    imports: [MailModule],
    providers: [ContactService],
    controllers: [ContactController],
})
export class ContactModule {}
