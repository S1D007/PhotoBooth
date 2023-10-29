import { Image } from "@nextui-org/react";
import React from "react";
import NextImage from "next/image";
import useDataStore from "@/supplier/DataStore";
const FramePreview = () => {
  const { frame } = useDataStore();

  return (
    <div className="flex justify-center items-center p-2">
      <Image
        as={NextImage}
        src={frame?.src}
        isBlurred
        width={400}
        height={600}
      />
    </div>
  );
};

export default FramePreview;
