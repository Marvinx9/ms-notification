import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MailerModule } from '@nestjs-modules/mailer';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAIL_HOST,
        port: parseInt(process.env.MAIL_PORT),
        secure: false,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
