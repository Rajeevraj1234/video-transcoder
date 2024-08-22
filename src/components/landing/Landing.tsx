"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { useState } from "react";

const Landing = () => {
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/video", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        console.log("successfull", data);
      } else {
        const errorData = await res.json();
        console.error(errorData.message || "Upload failed");
      }
    } catch (error) {
      console.error("An unexpected error occurred");
    } finally {
      setUploading(false);
    }
  };
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col px-[300px] justify-center items-center">
      <div className="text-[3rem] font-bold">
        Welcome to the video Transcoder
      </div>
      <div className="flex  flex-col justify-center items-center my-10 ">
        <form onSubmit={handleUpload}>
          <Input
            className="w-[500px] h-[50px] text-[1.6rem]"
            type="file"
            onChange={handleFileChange}
          />
          <Button type="submit" disabled={!file || uploading}>
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
      <div>
        <ModeToggle />
      </div>
      <a
        href="https://leetcode.com/problems/longest-consecutive-sequence/solution/"
        target="_blank"
        rel="noreferrer"
      >
        <div>go to questions</div>
      </a>
    </div>
  );
};

export default Landing;
