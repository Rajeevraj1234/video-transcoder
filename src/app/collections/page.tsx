import Collections from "@/components/collections/Collections";
import { prisma } from "@/lib/db/index";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

const Page = async () => {
  const session = await getServerSession(authOptions);
  let videoData;
  if (session) {
    videoData = await prisma.video_metadata.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        Transcoded_video_metadata: true,
      },
    });
  }
  return (
    <div>
      <Collections videoData={videoData} />
    </div>
  );
};

export default Page;
