"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  Transcoded_video_metadata: TranscodedVideoMetadataProp[];
  createdAt: Date;
  id: string;
  originalName: string;
  updatedName: string;
  url: string;
  userId: string;
  videoType: string;
}

interface CollectionsProps {
  videoData: VideoDataProp[];
}

const Collections: React.FC<CollectionsProps> = ({ videoData }) => {
  return (
    <div className="mx-[300px] mt-[100px]">
      <div className="text-[2rem] font-bold tracking-tight mb-10">
        Your Collections
      </div>
      {videoData ? (
        <>
          <Table>
            <TableHeader className="bg-secondary rounded-t-lg overflow-hidden">
              <TableRow>
                <TableHead className="w-[25%]">Name</TableHead>
                <TableHead className="w-[35%]">Type</TableHead>
                <TableHead className="w-[40%]">Url</TableHead>
              </TableRow>
            </TableHeader>
            {videoData.map((video: any, index: number) => {
              return (
                <TableBody key={index} className="font-light">
                  <TableRow>
                    <TableCell className="font-medium">
                      {video.originalName}
                    </TableCell>
                    <TableCell className="">{video.videoType}</TableCell>
                    <TableCell className="text-primary font-medium underline">
                      <a href={video.url} target="_blank">
                        URL for original video
                      </a>
                    </TableCell>
                  </TableRow>
                  {video.Transcoded_video_metadata.length > 0 && (
                    <TableRow className="">
                      <TableCell className="font-medium w-[]">
                        {video.originalName}
                      </TableCell>
                      <TableCell>
                        {video.Transcoded_video_metadata[0].videoType}
                      </TableCell>
                      <TableCell className="text-primary font-medium underline">
                        <a
                          href={video.Transcoded_video_metadata[0].url360}
                          target="_blank"
                        >
                          URL for 360p
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                  {video.Transcoded_video_metadata.length > 0 && (
                    <TableRow>
                      <TableCell className="font-medium w-[]">
                        {video.originalName}
                      </TableCell>
                      <TableCell>
                        {video.Transcoded_video_metadata[0].videoType}
                      </TableCell>
                      <TableCell className="text-primary font-medium underline">
                        <a
                          href={video.Transcoded_video_metadata[0].url480}
                          target="_blank"
                        >
                          URL for 480p
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                  {video.Transcoded_video_metadata.length > 0 && (
                    <TableRow>
                      <TableCell className="font-medium w-[]">
                        {video.originalName}
                      </TableCell>
                      <TableCell>
                        {video.Transcoded_video_metadata[0].videoType}
                      </TableCell>
                      <TableCell className="text-primary font-medium underline">
                        <a
                          href={video.Transcoded_video_metadata[0].url720}
                          target="_blank"
                        >
                          URL for 720p
                        </a>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              );
            })}
          </Table>
        </>
      ) : (
        <div className="text-lg font-light">
          OOPS!! No collection to show here
        </div>
      )}
    </div>
  );
};

export default Collections;
