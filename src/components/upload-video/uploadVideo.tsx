"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ModeToggle/ModeToggle";
import { useState } from "react";

const UploadVideo = ({ uploadPath }: { uploadPath: string }) => {
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [transcoded_urls, setTranscoded_urls] = useState<string[] | null>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(uploadPath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        const allUrls: string[] = Object.values(data.urls);
        setTranscoded_urls(allUrls);

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
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleUpload}
        >
          <label
            htmlFor="uploadFile1"
            className="bg-background text-gray-500 font-semibold text-foreground rounded w-[500px] h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-14 mb-2 fill-gray-500"
              viewBox="0 0 32 32"
            >
              <path
                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                data-original="#000000"
              />
              <path
                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                data-original="#000000"
              />
            </svg>
            Upload Video file
            <input
              type="file"
              id="uploadFile1"
              className="hidden"
              onChange={handleFileChange}
            />
            <p className="text-xs font-medium text-gray-400 mt-2">
              MP4, MKV are Allowed.
            </p>
          </label>{" "}
          <Button
            type="submit"
            disabled={!file || uploading}
            size={"lg"}
            className="my-10"
          >
            {uploading ? "Uploading..." : "Upload"}
          </Button>
        </form>
      </div>
      <div>
        <ModeToggle />
      </div>
      <div>
        {transcoded_urls?.map((url, index) => {
          return (
            <div key={index}>
              <a href="url">{url}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UploadVideo;
