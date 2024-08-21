"use server";
import { signIn, signOut } from "@/lib/auth";

export async function Signin_action() {
  await signIn("google");
}
export async function Signout_action() {
  await signOut();
}
