import { Module } from '@nestjs/common';
import { TelegrafModule } from 'nestjs-telegraf';
import { ConfigModule } from '@nestjs/config';

import { TelegramService } from './telegram.service';
import { options } from './telegram-config.factory';
import { ChatGptModule } from 'src/chatgpt/chatgpt.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TelegrafModule.forRootAsync(options()),
    ChatGptModule,
  ],
  providers: [TelegramService],
})
export class TelegramModule {}
