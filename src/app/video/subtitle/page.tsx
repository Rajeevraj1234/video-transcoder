import UploadVideo from "@/components/upload-video/uploadVideo";

const subtitle = () => {
  return (
    <div>
      <UploadVideo
        headerName={"Generate the subtitle here"}
        uploadPath={"/api/video/subtitle"}
      />
    </div>
  );
};

export default subtitle;
