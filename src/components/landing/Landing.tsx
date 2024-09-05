"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
const Landing = () => {
  const router = useRouter();
  return (
    <div className="h-[90vh] w-[99vw] flex flex-col px-[300px] justify-center items-center">
      <h1 className="text-[4rem] font-bold tracking-tight">
        Welcome to video Transcoder
      </h1>
      <p className="font-medium text-xs mb-4 w-[600px] italic text-gray-400 text-center">
        Transform your videos with ease! Convert any type of video file into any
        resolution, from crisp 360p to stunning 4K. Add subtitles effortlessly
        to make your content more accessible and engaging. Elevate your video
        experience with our powerful and user-friendly tool.
      </p>
      <Button
        onClick={() => {
          router.push("/video/transcode");
        }}
        className="font-bold"
      >
        Try now !!
      </Button>
    </div>
  );
};

export default Landing;
