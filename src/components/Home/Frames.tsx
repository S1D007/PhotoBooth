import { Button, Image } from "@nextui-org/react";
import { StaticImageData } from "next/image";
import React from "react";
import NextImage from "next/image";
import useDataStore from "@/supplier/DataStore";
import { NextArrowIcon } from "../Icons";
import { useRouter } from "next/router";
interface FramesProps {
  frames: StaticImageData[];
}
const Frames: React.FC<FramesProps> = ({ frames }) => {
  const { setFrame, frame: CurrentFrame } = useDataStore();
  const router = useRouter();
  return (
    <div className="flex justify-center items-center p-2 flex-col">
      <div className="w-1/2 flex overflow-x-auto space-x-7 justify-center items-center rounded-3xl p-2">
        {frames.map((frame, index) => {
          const currentFrame = CurrentFrame?.src === frame.src;
          return (
            <Image
              className={`${
                currentFrame ? "border-4 border-white" : ""
              } p-2`}
              key={index}
              //   as={NextImage}
              src={frame.src}
              width={200}
              height={400}
              onClick={() => {
                setFrame(frame);
              }}
            />
          );
        })}
      </div>
      <Button
        size="lg"
        isIconOnly
        color="primary"
        variant="flat"
        aria-label="Next"
        onClick={() => {
          router.replace("/camera");
        }}
      >
        <NextArrowIcon />
      </Button>
    </div>
  );
};

export default Frames;
