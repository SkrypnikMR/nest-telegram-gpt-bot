export const createHeaders = (token: string): any => ({
  'Content-type': 'application/json',
  Authorization: `Bearer ${token}`,
});

export const createData = (content: string) => ({
  model: 'gpt-3.5-turbo',
  messages: [{ role: 'user', content }],
  temperature: 1,
});
