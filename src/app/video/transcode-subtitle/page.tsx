import UploadVideo from "@/components/upload-video/uploadVideo";

const transcode_subtitle = () => {
  return (
    <div>
      <UploadVideo uploadPath={"/api/video/transcode-and-sub"} />
    </div>
  );
};

export default transcode_subtitle;
