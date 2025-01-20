"use server";

import { signInFormSchema } from "../validators";
import { signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// Sign in the user with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "登陆成功" };
  } catch (error) {
    console.error(error);
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "邮箱或密码错误" };
  }
}

// Sign user out
export async function signOutUser() {
  await signOut();
}
