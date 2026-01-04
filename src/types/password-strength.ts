export type PasswordStrength =
  | "Weak"
  | "Medium"
  | "Strong"
  | "Very Strong"
  | null;

export interface PasswordStrengthResult {
  score: number;
  strength: PasswordStrength;
  feedback?: string[];
}
