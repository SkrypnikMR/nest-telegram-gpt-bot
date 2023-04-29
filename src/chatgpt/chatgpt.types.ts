export interface GptAnswer {
  id: string;
  object: string;
  created: number;
  model: string;
  usage: {
    promt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
  choices: {
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
    index: number;
  }[];
}
