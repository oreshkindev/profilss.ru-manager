type Rule = (value: any) => boolean;
type FieldRule = { fieldName: string; rule: Rule; errorMessage: string };
type ErrorRecord = Record<string, string>;
type FieldRuleSets = Record<string, FieldRule[]>;

export class Protector {
  private fields: FieldRuleSets = {};

  constructor(...fieldRules: FieldRule[]) {
    fieldRules.forEach(({ fieldName, rule, errorMessage }) => {
      if (!this.fields[fieldName]) {
        this.fields[fieldName] = [];
      }
      this.fields[fieldName].push({
        rule,
        errorMessage,
        fieldName: ''
      });
    });
  }

  private getValueByPath(data: any, path: string): any {
    return path.split('.').reduce((acc, part) => acc?.[part], data);
  }

  public validate(data: any): ErrorRecord {
    const errors: ErrorRecord = {};

    Object.entries(this.fields).forEach(([fieldName, rules]) => {
      const fieldValue = this.getValueByPath(data, fieldName);
      const fieldErrors = rules.map(({ rule, errorMessage }) => (!rule(fieldValue) ? errorMessage : null)).filter(Boolean);

      if (fieldErrors.length) {
        errors[fieldName] = fieldErrors.join('; ');
      }
    });

    return errors;
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
