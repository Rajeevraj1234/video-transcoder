"use client";
import { useRouter } from "next/navigation";
const Landing = () => {
  const router = useRouter();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col px-[300px] justify-center items-center">
      <button type="button" onClick={() => router.push("video/subtitle")}>
        Dashboard
      </button>
    </div>
  );
};

export default Landing;
