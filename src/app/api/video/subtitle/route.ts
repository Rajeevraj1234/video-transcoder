"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TranscodeVideo from "@/actions/transcoding/index";

export async function POST(request: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "make sure your are signed up",
          status: 401,
        }, //401 is for unauthorization
      );
    }
    const formData = await request.formData();
    const file = formData.get("file"); //get the file form the form data
    const option = "SUB";
    const transcoded_res = await TranscodeVideo(file, option, session.user.id);
    console.log(transcoded_res);
    if (transcoded_res.success) {
      return NextResponse.json({
        success: true,
        message: "Process Executed successfully check collection",
        status: 200,
      });
    } else {
      return NextResponse.json({
        success: false,
        message: "trancoding failed due to some server error",
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
