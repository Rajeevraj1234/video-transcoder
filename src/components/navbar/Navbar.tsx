"use client";
import { ModeToggle } from "../ModeToggle/ModeToggle";
import { useRouter } from "next/navigation"; //useRouter should be imported from next/navigation not form next/router
const Navbar = () => {
  const router = useRouter();
  function handleClick(path: string) {
    router.push(path);
  }
  return (
    <div className="h-16 border-white bg-transparent">
      <div className="h-full flex justify-between items-center mx-10 ">
        <div className="text-[2.5rem] font-bold ">vT</div>
        <div>
          <div className="flex justify-center text-sm items-center gap-7">
            <span onClick={() => handleClick("/")} className="cursor-pointer">
              Home
            </span>
            <span
              onClick={() => handleClick("/collections")}
              className="cursor-pointer"
            >
              Collections
            </span>
            <span
              onClick={() => handleClick("/video/transcode")}
              className="cursor-pointer"
            >
              Transcode
            </span>
            <span
              onClick={() => handleClick("/video/subtitle")}
              className="cursor-pointer"
            >
              Subtitle
            </span>
            <span
              onClick={() => handleClick("/video/transcode-subtitle")}
              className="cursor-pointer"
            >
              Transcode and Subtitle
            </span>
            <span onClick={() => handleClick} className="cursor-pointer">
              <ModeToggle />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
