import { describe, it, expect } from 'vitest';
import { RedactionEngine } from '../src/redaction/redactor';

describe('RedactionEngine', () => {
  const redactor = new RedactionEngine('C:\\Users\\Jakub Lis\\Desktop\\01_PROJEKTY\\ViberHub', 'C:\\Users\\Jakub Lis');

  it('redacts sensitive API keys and secrets from strings', () => {
    const raw = 'ApiKey is AIzaSyA4FBH8pMWE3V6Dd5zGCes4Pp5pqMzZoww and secret is sk-abcdef1234567890123456';
    const sanitized = redactor.sanitizeString(raw);

    expect(sanitized).not.toContain('AIzaSyA4FBH8pMWE3V6Dd5zGCes4Pp5pqMzZoww');
    expect(sanitized).not.toContain('sk-abcdef1234567890123456');
    expect(sanitized).toContain('<REDACTED_SECRET>');
  });

  it('redacts object keys that match sensitive patterns', () => {
    const payload = {
      user: 'operator',
      apiKey: 'secret_123',
      nested: {
        token: 'bearer xyz',
        safeProperty: 'hello world',
      },
    };

    const { redactedData, redactedFieldsCount } = redactor.sanitizeObject(payload);

    expect(redactedData.apiKey).toBe('<REDACTED_BY_VIBEHUB>');
    expect(redactedData.nested.token).toBe('<REDACTED_BY_VIBEHUB>');
    expect(redactedData.nested.safeProperty).toBe('hello world');
    expect(redactedFieldsCount).toBe(2);
  });

  it('detects ignored file paths correctly', () => {
    expect(redactor.isIgnoredPath('.env')).toBe(true);
    expect(redactor.isIgnoredPath('.env.local')).toBe(true);
    expect(redactor.isIgnoredPath('node_modules/express/index.js')).toBe(true);
    expect(redactor.isIgnoredPath('.git/HEAD')).toBe(true);
    expect(redactor.isIgnoredPath('apps/web/page.tsx')).toBe(false);
  });
});
