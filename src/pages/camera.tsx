import Logo from "@/components/common/Logo";
import Wrapper from "@/components/common/Wrapper";
import useDataStore from "@/supplier/DataStore";
import { Button, Image } from "@nextui-org/react";
import React, { useEffect } from "react";
import axios from "axios";
// import frame1 from "../assets/frame1.png";
import {
  CameraIcon,
  EmailIcon,
  RetryIcon,
  WhatsappIcon,
} from "@/components/Icons";
const api = "https://15.206.74.208.nip.io";
import { useRouter } from "next/router";

export const dataURItoBlob = (dataURI: string): Blob => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

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
  const [qr, setQr] = React.useState<string>("");
  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 600,
          height: 400,
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
      {/* <Logo /> */}
      <div>
        {qr && (
          <img
            src={qr}
            className="
            w-80 h-80 rounded-2xl self-center
            "
          />
        )}
        {
          !qr && <Image
          className="z-10 absolute top-0 left-0"
          src={frame?.src}
          width={400}
          height={700}
        />
        }
        {!qr &&
          (!image ? (
            <video className="rounded-2xl" ref={videoRef} autoPlay></video>
          ) : (
            <Image
              className="-z-10 object-cover rounded-2xl"
              src={image}
              width={videoRef.current?.videoWidth}
              height={videoRef.current?.videoHeight}
            />
          ))}
      </div>
      {!image && !qr && (
        <div
          className="
        w-24 h-24 rounded-full bg-blue-600 flex justify-center items-center
        hover:bg-blue-700 transition-all duration-300 ease-in-out
        "
          onClick={handleScreenshot}
        >
          <CameraIcon size={50} />
        </div>
      )}
      {image && (
        <div className="flex justify-evenly items-center flex-col space-y-4 pt-10">
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
                router.push("/");
              }}
            >
              <RetryIcon size={50} />
            </div>
            <div
              className="
            w-24 h-24 rounded-full bg-green-600 flex justify-center items-center
            hover:bg-green-700 transition-all duration-300 ease-in-out
            "
              onClick={async () => {
                setImage("");
                const prompt = window.prompt(
                  "Enter the whatsapp number to share"
                );
                console.log(prompt);
                const formData = new FormData();
                const relImage = dataURItoBlob(image);
                formData.append("base", relImage);
                const response = await fetch(frame?.src as any);
                const imageBuffer = await response.arrayBuffer();
                const imageFile = new File([imageBuffer], "image.png", {
                  type: "image/png",
                });
                formData.append("overlay", imageFile);
                console.log(formData);
                axios
                  .post(
                    `https://15.206.74.208.nip.io/api/sendWhatsAppMessage?phone_number=${prompt}`,
                    formData
                  )
                  .then((res) => {
                    console.log(res);
                    alert("Image sent successfully");
                  })
                  .catch((err) => {
                    console.log(err);
                    alert("Something went wrong");
                  });
              }}
            >
              <WhatsappIcon size={50} />
            </div>
            <div
              className="
            w-24 h-24 rounded-full bg-red-600 flex justify-center items-center
            hover:bg-red-700 transition-all duration-300 ease-in-out
            "
              onClick={async () => {
                setImage("");
                // remove white space from prompt
                const prompt = window.prompt("Enter the email id to share");
                const formData = new FormData();
                const relImage = dataURItoBlob(image);
                formData.append("base", relImage);
                const response = await fetch(frame?.src as any);
                const imageBuffer = await response.arrayBuffer();
                const imageFile = new File([imageBuffer], "image.png", {
                  type: "image/png",
                });
                formData.append("overlay", imageFile);
                console.log(prompt?.trim());
                axios
                  .post(
                    `${api}/api/sendEmail?email=${prompt}`,
                    formData
                  )
                  .then((res) => {
                    alert("Image sent successfully");
                  })
                  .catch((err) => {
                    alert("Something went wrong");
                  });
              }}
            >
              <EmailIcon size={50} />
            </div>
            <div
              className="
            w-24 h-24 rounded-full bg-red-600 flex justify-center items-center
            hover:bg-red-700 transition-all duration-300 ease-in-out
            "
              onClick={async () => {
                // setImage("");
                const formData = new FormData();
                formData.append("base", image);
                const relImage = dataURItoBlob(image);
                formData.append("base", relImage);
                const response = await fetch(frame?.src as any);
                const imageBuffer = await response.arrayBuffer();
                const imageFile = new File([imageBuffer], "image.png", {
                  type: "image/png",
                });
                formData.append("overlay", imageFile);
                axios
                  .post(`${api}/api/qr`, formData)
                  .then((res) => {
                    console.log(res);
                    setQr(res.data.qr);
                  })
                  .catch((err) => {});
              }}
            >
              <h1 className="text-white text-center text-lg font-bold">QR</h1>
            </div>
            <div onClick={async ()=>{
              const formData = new FormData();
              formData.append("base", image);
              const relImage = dataURItoBlob(image);
              formData.append("base", relImage);
              const response = await fetch(frame?.src as any);
              const imageBuffer = await response.arrayBuffer();
              const imageFile = new File([imageBuffer], "image.png", {
                type: "image/png",
              });
              formData.append("overlay", imageFile);
              axios
                .post(`${api}/api/qr`, formData)
                .then((res) => {
                  // download image
                  const link = document.createElement('a');
                  link.href = res.data.qr;
                  link.download = 'image.png';
                  document.body.appendChild(link);
                  link.click();
                })
                .catch((err) => {});
            }} className="bg-black rounded-full p-x-2 py-1 font-bold text-2xl cursor-pointer">Download</div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default camera;
