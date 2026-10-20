/**
 * VibeHub Bridge — Zero-Trust Redaction Engine
 * Filtruje sekrety, klucze API, hasła, zmienne środowiskowe oraz wrażliwe ścieżki
 */

const SENSITIVE_KEY_PATTERNS = [
  /api[_-]?key/i,
  /secret/i,
  /token/i,
  /password/i,
  /credential/i,
  /private[_-]?key/i,
  /auth/i,
];

const SECRET_VALUE_PATTERNS = [
  /AIza[0-9A-Za-z-_]{35}/g, // Google API Key
  /sk-[a-zA-Z0-9]{20,}/g,    // OpenAI / general secret key
  /ghp_[a-zA-Z0-9]{36}/g,   // GitHub Personal Access Token
  /bearer\s+[a-zA-Z0-9._-]+/gi,
];

export interface RedactionResult<T> {
  redactedData: T;
  redactedFieldsCount: number;
}

export class RedactionEngine {
  private projectRoot: string;
  private homeDir: string;

  constructor(projectRoot = '', homeDir = '') {
    this.projectRoot = projectRoot;
    this.homeDir = homeDir || process.env.USERPROFILE || process.env.HOME || '';
  }

  public sanitizeString(text: string): string {
    if (!text) return text;
    let result = text;

    // Redaguj znane wzorce kluczy/tokenów
    for (const pattern of SECRET_VALUE_PATTERNS) {
      result = result.replace(pattern, '<REDACTED_SECRET>');
    }

    // Anonimizuj ścieżki systemowe
    if (this.homeDir && this.homeDir.length > 3) {
      result = result.split(this.homeDir).join('$USER_HOME');
    }
    if (this.projectRoot && this.projectRoot.length > 3) {
      result = result.split(this.projectRoot).join('$PROJECT_ROOT');
    }

    return result;
  }

  public sanitizeObject<T extends Record<string, unknown>>(obj: T): RedactionResult<T> {
    let count = 0;
    const sanitized = JSON.parse(JSON.stringify(obj));

    const recurse = (current: Record<string, unknown>) => {
      for (const key of Object.keys(current)) {
        const val = current[key];

        // Sprawdź czy nazwa klucza jest wrażliwa
        const isKeySensitive = SENSITIVE_KEY_PATTERNS.some((pat) => pat.test(key));
        if (isKeySensitive) {
          current[key] = '<REDACTED_BY_VIBEHUB>';
          count++;
          continue;
        }

        if (typeof val === 'string') {
          const cleaned = this.sanitizeString(val);
          if (cleaned !== val) {
            current[key] = cleaned;
            count++;
          }
        } else if (val !== null && typeof val === 'object' && !Array.isArray(val)) {
          recurse(val as Record<string, unknown>);
        } else if (Array.isArray(val)) {
          current[key] = val.map((item) => {
            if (typeof item === 'string') {
              return this.sanitizeString(item);
            }
            if (item !== null && typeof item === 'object') {
              recurse(item as Record<string, unknown>);
            }
            return item;
          });
        }
      }
    };

    recurse(sanitized);
    return { redactedData: sanitized, redactedFieldsCount: count };
  }

  public isIgnoredPath(relPath: string): boolean {
    const ignored = [
      '.git',
      'node_modules',
      '.next',
      'dist',
      '.env',
      '.env.local',
      '.env.production',
      '.env.development',
      'id_rsa',
      'id_ed25519',
    ];
    const normalized = relPath.replace(/\\/g, '/');
    return ignored.some((ign) => normalized === ign || normalized.startsWith(`${ign}/`) || normalized.includes(`/${ign}/`));
  }
}
