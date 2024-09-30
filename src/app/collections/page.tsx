import Collections from "@/components/collections/Collections";
import { prisma } from "@/lib/db/index";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";


interface TranscodedVideoMetadataProp {
  createdAt: Date;
  id: string;
  url360: string | null;
  url480: string | null;
  url720: string | null;
  url1080: string | null;
  userId: string;
  videoId: string;
  videoType: string;
}

interface VideoDataProp {
  transcodedVideoMetadata: TranscodedVideoMetadataProp[];
  createdAt: Date;
  id: string;
  originalName: string;
  updatedName: string;
  url: string;
  userId: string;
  videoType: string;
}

type VideoDataArray = VideoDataProp[];

const Page = async () => {
  const session = await getServerSession(authOptions);
  let videoData: VideoDataArray = [];
  
  if (session) {
    videoData = await prisma.video_metadata.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        transcodedVideoMetadata: true,
      },
    }) as VideoDataArray; // Add type assertion here
  }
  
  
  return (
    <div>
      <Collections videoData={videoData} />
    </div>
  );
};

export default Page;
