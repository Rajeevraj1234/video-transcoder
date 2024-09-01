"use server";
import { authOptions } from "@/lib/auth";

export async function Signin_action() {
  await authOptions.signIn("google");
}
export async function Signout_action() {
  await authOptions.signOut();
}
