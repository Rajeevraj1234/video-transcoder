"use server";

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import TranscodeVideo from "@/actions/transcoding/index";

//find the correct request for this NextRequest is not letting do to request.formData
export async function POST(request: any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Make sure your are signed up",
          status: 401,
        }, //401 is for unauthorization
      );
    }
    const formData = await request.formData();
    const file = formData.get("file"); //get the file form the form data
    const resolutionsObject = formData.get("resolutions"); // get the resolutions as a string

    // Parse the string into an array
    const resolutions = JSON.parse(resolutionsObject); // Convert JSON string to array

    if (resolutions.length <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "select atleast one resolution",
          status: 400,
        }, //401 is for unauthorization
      );
    }
    if (file.size > 104857600) {
      return NextResponse.json({
        success: false,
        message: "File size exceed max size",
        status: 400,
      });
    }
    const option = "TRANS";
    const transcoded_res = await TranscodeVideo(
      file,
      option,
      session.user.id,
      resolutions,
    );
    if (transcoded_res.success) {
      return NextResponse.json({
        success: true,
        message:
          "Processing has started !! Check Email or Collections for completion of process",
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
