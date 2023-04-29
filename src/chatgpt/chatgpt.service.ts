import { ConfigService } from '@nestjs/config';
import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Observable, map, catchError, of, retry } from 'rxjs';

import { createHeaders, createData } from './chatgpt.utils';
import type { GptAnswer } from './chatgpt.types';

@Injectable()
export class ChatGptService {
  private readonly logger = new Logger(ChatGptService.name);

  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  generateResponse(content: string): Observable<string> {
    const headers = createHeaders(this.configService.get<string>('GPT_KEY'));
    const data = createData(content);

    return this.httpService
      .post<GptAnswer>(this.configService.get<string>('GPT_API'), data, {
        headers,
      })
      .pipe(
        map(({ data }) => data.choices[0].message.content.trim()),
        retry(3),
        catchError((err) => {
          this.logger.error(err);

          return of('Error, try another way of asking');
        }),
      );
  }
}
