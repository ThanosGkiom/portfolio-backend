import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './Contact/contact.entity';
import { ContactModule } from './Contact/contact.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ContactModule,
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: 3306,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            entities: [Contact],
            // synchronize: true,
            // dropSchema: true,
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
