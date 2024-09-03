import UploadVideo from "@/components/upload-video/uploadVideo";

const subtitle = () => {
  return (
    <div>
      <UploadVideo uploadPath={"/api/video/subtitle"} />
    </div>
  );
};

export default subtitle;
