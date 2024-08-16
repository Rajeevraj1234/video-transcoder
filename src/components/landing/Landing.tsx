import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Landing = () => {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col px-[300px] justify-center items-center">
      <div className="text-[3rem] font-bold">
        Welcome to the video Transcoder 
      </div>
      <div className="flex  flex-col justify-center items-center my-10 ">
        <Input id="picture" className="w-[500px] h-[50px] text-[1.6rem]" type="file" />
      </div>
      <div>
        <Button>Process</Button>
      </div>
    </div>
  );
};

export default Landing;
