import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MailerService } from '@nestjs-modules/mailer';

type NotificationDto = {
  email: string;
  startAt: Date;
  endAt: Date;
  name: string;
  title: string;
  description: string;
};

@Controller()
export class AppController {
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern('tp_task_notification')
  async taskNotification(data: NotificationDto) {
    await this.mailerService.sendMail({
      to: data.email,
      from: 'taskmanager@gmail.com.br',
      subject: 'Notificação de tarefa',
      html: `
        <body>
          <h1>Olá ${data.name} </h1>

          <span>Você tem uma tarefa para hoje</span>
          <br/>
          <span>Título: ${data.title}</span>
          <br/>
          <span>Descrição: ${data.description}</span>
          <br/>
          <span>Início: ${data.startAt}</span>
          <br/>
          <span>Fim: ${data.endAt}</span>
        </body>
      `,
    });
  }
}
