import Logo from "@/components/common/Logo";
import Wrapper from "@/components/common/Wrapper";
import useDataStore from "@/supplier/DataStore";
import { Button, Image } from "@nextui-org/react";
import React, { useEffect } from "react";
// import frame1 from "../assets/frame1.png";
import {
  CameraIcon,
  EmailIcon,
  RetryIcon,
  WhatsappIcon,
} from "@/components/Icons";
import { useRouter } from "next/router";

const camera = () => {
  const { frame } = useDataStore();
  const router = useRouter();
  const [image, setImage] = React.useState<string>("");
  const videoRef = React.useRef<HTMLVideoElement>(null);
//   const videoWidth = 300;
//   const videoHeight = 400; // Adjust according to your requirement

  const handleScreenshot = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageSrc = canvas.toDataURL("image/png");
        setImage(imageSrc);
      }
    }
  };

  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          aspectRatio: 16/9,
        },
      })
      .then((mediaStream) => {
        stream = mediaStream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    };
  }, [image]);

  return (
    <Wrapper>
      <Logo />
      <div className="min-h-[600px] min-w-[400px] bg-white">
        {!image ? (
          <video
            className="rounded-2xl min-h-[600px]"
            ref={videoRef}
            autoPlay
          ></video>
        ) : (
          <Image
            className="min-h-[600px] object-cover rounded-2xl"
            src={image}
            width={400}
            height={600}
          />
        )}
      </div>
      <div
        className="
        w-24 h-24 rounded-full bg-blue-600 flex justify-center items-center
        hover:bg-blue-700 transition-all duration-300 ease-in-out
        "
        onClick={handleScreenshot}
      >
        <CameraIcon size={50} />
      </div>
      {/* <div>
        <Image
          className="z-10 absolute top-0"
          src={frame?.src}
          width={400}
          height={600}
        />
        {image && (
          <Image
            className="-z-10 rounded-2xl"
            src={image}
            width={400}
            height={600}
          />
        )}
        {!image && (
          <video
            className="rounded-2xl min-h-[600px]"
            ref={videoRef}
            width={400}
            height={600}
            autoPlay
          ></video>
        )}
      </div>
      {image && (
        <div className="flex justify-evenly items-center flex-col space-y-4 pt-10" >
            <h1 className="text-white text-center text-lg font-bold">
          Share your image in High Quality
        </h1>
          <div className="flex justify-evenly items-center flex-row space-x-4">
            <div
              className="
              w-24 h-24 rounded-full bg-gray-600 flex justify-center items-center
              hover:bg-gray-700 transition-all duration-300 ease-in-out
              "
              onClick={() => {
                setImage("");
                router.push("/")
              }}
            >
              <RetryIcon size={50} />
            </div>
            <div
            className="
            w-24 h-24 rounded-full bg-green-600 flex justify-center items-center
            hover:bg-green-700 transition-all duration-300 ease-in-out
            "
            onClick={()=>{
                setImage("")
            }}
            >
            <WhatsappIcon size={50} />
            </div>
            <div
            className="
            w-24 h-24 rounded-full bg-red-600 flex justify-center items-center
            hover:bg-red-700 transition-all duration-300 ease-in-out
            "
            onClick={()=>{
                setImage("")
            }}
            >
            <EmailIcon size={50} />
        </div>
          </div>
        </div>
      )}
      {!image && (
        <div
        className="
        w-24 h-24 rounded-full bg-blue-600 flex justify-center items-center
        hover:bg-blue-700 transition-all duration-300 ease-in-out
        "
          onClick={handleScreenshot}
        //   className="absolute bottom-10"
        >
          <CameraIcon size={50} />
        </div>
      )} */}
    </Wrapper>
  );
};

export default camera;
