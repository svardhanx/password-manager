import { CredentialType } from "@/types/password-credentials";

export const mockCredentials: CredentialType[] = [
  {
    websiteLink: "https://github.com",
    websiteName: "GitHub",
    email: "alice@example.com",
    password: "securePass!2025",
    username: "alice_dev",
    notes: "Personal account, enabled 2FA with authenticator app",
  },
  {
    websiteLink: "https://bankofexample.com",
    websiteName: "Bank of Example",
    email: "john.doe@mainbank.com",
    password: "MyB@nkP@ssw0rd!",
    username: "johndoe123",
    notes: "Main checking account. Use hardware key for login.",
  },
  {
    websiteLink: "https://netflix.com",
    websiteName: "Netflix",
    email: "family@streaming.com",
    password: "StreamFamily2024",
    notes: "Shared family plan. Profile: Kids restricted.",
    // username is optional, so omitted here
  },
];
