import UploadVideo from "@/components/upload-video/uploadVideo";

const transcode_subtitle = () => {
  return (
    <div>
      <UploadVideo
        headerName={"Transcode and Add Subtitle here"}
        uploadPath={"/api/video/transcode-and-sub"}
      />
    </div>
  );
};

export default transcode_subtitle;
