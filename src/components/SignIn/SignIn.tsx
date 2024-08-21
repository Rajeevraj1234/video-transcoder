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
        <div className="h-[100vh] w-full flex flex-col justify-center items-center">
          <div className="border p-5 flex h-[20%] flex-col justify-center items-center rounded-md">
            <div className="text-[2rem] font-bold mb-5">Login to video transcoder</div>
            <form action={Signin_action}>
              <Button variant={"outline"} size={"lg"} type="submit">
                Signin with Google{" "}
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
