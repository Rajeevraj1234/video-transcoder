"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/hooks/use-toast";
import Checkbox from "@/components/checkbox/Checkbox";

//upload prop goes here
interface uploadVideoProp {
  uploadPath: string;
  headerName: string;
}
const UploadVideo = ({ uploadPath, headerName }: uploadVideoProp) => {
  const [file, setFile] = useState<any>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedResolutions, setSelectedResolutions] = useState<string[]>([]);
  const { toast } = useToast();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  function handleToast(message: string, success: boolean) {
    toast({
      variant: success ? "default" : "destructive",
      description: message,
    });
  }

  const handleUpload = async (e: any) => {
    e.preventDefault();
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("resolutions", JSON.stringify(selectedResolutions));
    try {
      const res = await fetch(uploadPath, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        handleToast(data.message, data.success);
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
    <div className="h-[90vh] w-[99vw] flex flex-col px-[300px] justify-center items-center">
      <div className="text-[3rem] font-bold">{headerName} </div>
      <div className="flex  flex-col justify-center items-center my-10 ">
        <form
          className="flex flex-col justify-center items-center"
          onSubmit={handleUpload}
        >
          <label
            htmlFor="videofile"
            className="bg-background text-gray-500 font-semibold text-foreground rounded w-[500px] h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
          >
            {!file ? (
              <>
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
                  id="videofile"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-xs font-medium text-gray-400 mt-2">
                  MP4, MKV are Allowed.
                </p>
                <p className="text-xs text-red-400  font-bold mt-2">
                  Max size 100mb
                </p>
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-folder-check"
                >
                  <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
                  <path d="m9 13 2 2 4-4" />
                </svg>
                File Uploaded
                <input
                  type="file"
                  id="videofile"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <p className="text-xs font-medium text-primary mt-2">
                  {file.name}
                </p>
              </>
            )}
          </label>{" "}
          <div className=" w-full mt-5 ">
            <h3 className="font-semibold text-lg mb-2 mt-5">
              Select Resolutions:
            </h3>
            <div className="flex gap-10 ml-1 justify-start  items-center">
              <div>
                <Checkbox
                  value={"360"}
                  selectedResolutions={selectedResolutions}
                  setSelectedResolutions={setSelectedResolutions}
                />
              </div>
              <div>
                <Checkbox
                  value={"480"}
                  selectedResolutions={selectedResolutions}
                  setSelectedResolutions={setSelectedResolutions}
                />
              </div>
              <div>
                <Checkbox
                  value={"720"}
                  selectedResolutions={selectedResolutions}
                  setSelectedResolutions={setSelectedResolutions}
                />
              </div>
              <div>
                <Checkbox
                  value={"1080"}
                  selectedResolutions={selectedResolutions}
                  setSelectedResolutions={setSelectedResolutions}
                />
              </div>
            </div>
          </div>
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
    </div>
  );
};

export default UploadVideo;
