import {
  PasswordStrength,
  PasswordStrengthResult,
} from "@/types/password-strength";

export function checkPasswordStrength(
  password: string | undefined
): PasswordStrengthResult {
  if (!password) {
    return { score: 0, strength: null };
  }

  let score = 0;
  const feedback: string[] = [];

  // Check for common weak patterns first (these reduce score)
  const commonPatterns = [
    /^[a-zA-Z]+\d+$/, // Letters followed by numbers (e.g., "Password123")
    /^\d+[a-zA-Z]+$/, // Numbers followed by letters
    /^[a-zA-Z]+$/, // Only letters (e.g., "InstaPassword")
    /^(123|abc|qwerty|password|admin|letmein|welcome)/i, // Common starts
    /(123|abc|password|admin|letmein|welcome)$/i, // Common ends
    /(.)\1{2,}/, // Repeated characters (e.g., "aaa", "111")
    /^[A-Z][a-z]+[A-Z][a-z]+\d*$/, // CamelCase pattern (e.g., "InstaPassword")
  ];

  const hasCommonPattern = commonPatterns.some((pattern) =>
    pattern.test(password)
  );

  // Common dictionary words that weaken passwords
  const commonWords = [
    "password",
    "admin",
    "user",
    "login",
    "welcome",
    "letmein",
    "monkey",
    "dragon",
    "master",
    "sunshine",
    "princess",
    "qwerty",
    "insta",
    "instagram",
    "facebook",
    "google",
    "twitter",
    "tiktok",
  ];

  const lowerPassword = password.toLowerCase();
  const hasCommonWord = commonWords.some((word) =>
    lowerPassword.includes(word)
  );

  // Length scoring
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (password.length >= 16) score++;

  // Character variety
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  if (hasLower) score++;
  if (hasUpper) score++;
  if (hasDigit) score++;
  if (hasSpecial) score++;

  // Bonus for multiple special characters
  const specialCount = (password.match(/[^a-zA-Z0-9]/g) || []).length;
  if (specialCount >= 2) score++;

  // Check for character distribution (not all chars at start or end)
  const hasGoodDistribution =
    hasLower &&
    hasUpper &&
    hasDigit &&
    !/^[a-z]+[A-Z]+\d+$|^[A-Z]+[a-z]+\d+$/.test(password);
  if (hasGoodDistribution) score++;

  // Apply penalties
  if (hasCommonPattern) {
    score = Math.max(0, score - 3);
    feedback.push(
      "Avoid common patterns like 'Password123' or 'InstaPassword'"
    );
  }

  if (hasCommonWord) {
    score = Math.max(0, score - 2);
    feedback.push("Avoid common words and brand names");
  }

  // Check for sequential characters
  if (/(?:abc|bcd|cde|012|123|234|345)/i.test(password)) {
    score = Math.max(0, score - 1);
    feedback.push("Avoid sequential characters");
  }

  // Determine strength with stricter thresholds
  let strength: PasswordStrength = "Weak";

  if (score >= 8 && !hasCommonPattern && !hasCommonWord) {
    strength = "Very Strong";
  } else if (score >= 6 && !hasCommonPattern && !hasCommonWord) {
    strength = "Strong";
  } else if (score >= 4 && !hasCommonWord) {
    strength = "Medium";
  } else {
    strength = "Weak";
  }

  // Add helpful feedback for weak passwords
  if (strength === "Weak" || strength === "Medium") {
    if (!hasSpecial) feedback.push("Add special characters (!@#$%^&*)");
    if (password.length < 12) feedback.push("Use at least 12 characters");
    if (!hasGoodDistribution)
      feedback.push("Mix different character types throughout");
  }

  return {
    score,
    strength,
    feedback: feedback.length > 0 ? feedback : undefined,
  };
}
