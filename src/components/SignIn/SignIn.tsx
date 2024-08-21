"use client";
import { useSession } from "next-auth/react";
import { Signin_action, Signout_action } from "@/actions/signin/index";
import { Button } from "../ui/button";

export default function SignIn() {
  const { data: session, status } = useSession();

  return (
    <div>
      {session ? (
        <div>
          <div>Welcome, {session?.user?.name}</div>
          <form action={Signout_action}>
            <Button type="submit">signout </Button>
          </form>
        </div>
      ) : (
        <form action={Signin_action}>
          <Button type="submit">Signin with Google</Button>
        </form>
      )}
    </div>
  );
}
