import { headers } from "next/headers";
import { auth } from "../auth";

export async function signIn(email: string, password: string) {
  const result = await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  return result;
}

export async function deleteUser(password: string) {
  try {
    const result = await auth.api.deleteUser({
      body: { password },
      headers: await headers(),
    });
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error("ERROR: ", error);
      return {
        success: false,
        message: error?.message ?? "Unknown error",
      };
    }
  }
}
