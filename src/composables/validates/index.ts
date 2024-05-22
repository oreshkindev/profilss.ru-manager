type Rule<T = any> = (value: T) => boolean;

interface FieldRule<T = any> {
  fieldName: string;
  rule: Rule<T>;
  errorMessage: string;
}

type ErrorRecord = Record<string, string[]>;

export class Protector {
  private fields: Record<string, FieldRule[]> = {};

  constructor(...fieldRules: FieldRule[]) {
    fieldRules.forEach(({ fieldName, rule, errorMessage }) => {
      this.fields[fieldName] = this.fields[fieldName] || [];
      this.fields[fieldName].push({ rule, errorMessage, fieldName });
    });
  }

  private getValueByPath<T>(data: Record<string, any>, path: string): T | undefined {
    const pathParts = path.replace(/\[(\d+)]/g, '.$1').split('.');
    return pathParts.reduce((acc, part) => acc?.[part], data) as T | undefined;
  }

  public validate(data: any): ErrorRecord {
    return Object.entries(this.fields).reduce((errors, [fieldName, rules]) => {
      const fieldValue = this.getValueByPath(data, fieldName);
      const fieldErrors = rules.filter(({ rule }) => !rule(fieldValue)).map(({ errorMessage }) => errorMessage);

      if (fieldErrors.length) {
        errors[fieldName] = fieldErrors;
      }

      return errors;
    }, {} as ErrorRecord);
  }
}

// Function to check if a string is an email string
export function isEmail(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

// Additional function to check the minimum string length
export function minLength(value: string, min: number): boolean {
  return value.length >= min;
}
export function isNonEmptyString(value: any): boolean {
  return typeof value === 'string' && value.trim() !== '';
}
