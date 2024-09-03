import UploadVideo from "@/components/upload-video/uploadVideo";

const transcode = () => {
  return (
    <div>
      <UploadVideo uploadPath={"/api/video/transcode"} />
    </div>
  );
};

export default transcode;
