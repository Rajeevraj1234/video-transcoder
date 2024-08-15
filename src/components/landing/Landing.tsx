import React from "react";

const Landing = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col px-[300px] justify-center items-center">
      <div className="text-[3rem] font-bold">
        Welcome to the video Transcoder app here to ease you work with us !!
      </div>
      <div className="flex  flex-col justify-center items-center">
        <input type="file" id="video-input"/>
      </div>
      <div>
        <button className="border px-4 py-2 border-black font-bold mt-10 rounded-lg bg-yellow-400 text-black">Process</button>
      </div>
    </div>
  );
};

export default Landing;
