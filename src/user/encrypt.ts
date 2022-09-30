import { createHmac } from 'crypto';

export function hashPassword(secret: string): string {
  return createHmac('sha256', secret).digest('hex');
}
