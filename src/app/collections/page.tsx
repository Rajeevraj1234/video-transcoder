import Collections from "@/components/collections/Collections";
import { prisma } from "@/lib/db/index";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  let video;
  let videoUpdated;
  if (session) {
    video = await prisma.video_metadata.findMany({
      where: {
        userId: session.user.id,
      },
    });
    videoUpdated = await prisma.transcoded_video_metadata.findMany();
  }
  return (
    <div>
      <Collections video={video} videoUpdated={videoUpdated} />
    </div>
  );
};

export default Page;
