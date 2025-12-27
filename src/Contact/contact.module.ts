import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailModule } from 'src/mail.module';

@Module({
    imports: [MailModule],
    providers: [ContactService],
    controllers: [ContactController],
})
export class ContactModule {}
