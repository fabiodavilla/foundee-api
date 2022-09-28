import { createHmac } from 'crypto';

export function hashPassword(secret: string) {
  return createHmac('sha256', secret).digest('hex');
}
