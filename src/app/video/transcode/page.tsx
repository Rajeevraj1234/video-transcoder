import UploadVideo from "@/components/upload-video/uploadVideo";

const transcode = () => {
  return (
    <div>
      <UploadVideo
        headerName={"Transcode the video here"}
        uploadPath={"/api/video/transcode"}
      />
    </div>
  );
};

export default transcode;
