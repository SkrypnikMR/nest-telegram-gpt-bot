import { ConfigService } from '@nestjs/config';
import { Update, Start, Ctx, On, Message } from 'nestjs-telegraf';
import { ChatGptService } from 'src/chatgpt/chatgpt.service';
import { Telegraf, Scenes } from 'telegraf';

type Context = Scenes.SceneContext;

@Update()
export class TelegramService extends Telegraf<Context> {
  constructor(
    private readonly configService: ConfigService,
    private readonly chatGptService: ChatGptService,
  ) {
    super(configService.get<string>('TELEGRAM_KEY'));
  }
  @Start()
  onStart(@Ctx() ctx: Context) {
    ctx.replyWithHTML(
      `Hello, <b>${ctx.from.username}</b> This bot with GPT! Try to ask me something.`,
    );
  }

  @On('text')
  onMessage(@Message('text') message: string, @Ctx() ctx: Context) {
    ctx.replyWithHTML(`Wait answer...`);
    return this.chatGptService.generateResponse(message);
  }
}
