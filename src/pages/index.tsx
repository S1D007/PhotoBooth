// Index.js

import { motion } from "framer-motion";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from 'next/router';

const Index = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };


  return (
    <motion.div
      className="h-screen w-screen flex flex-col justify-center items-center space-y-1"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-7xl text-center text-white">
          <span className="text-8xl text-pink-600 font-normal font-allura">
            Go
          </span>
          Kapture
        </h1>
      </motion.div>
      <motion.div variants={itemVariants}>
        <h1 className="text-white font-bold text-5xl text-center">⨯</h1>
      </motion.div>
      <motion.div
        className="flex justify-center items-center felx-row space-x-5 "
        variants={itemVariants}
      >
        <motion.div variants={itemVariants}>
          <Image
            alt="Fidelity Logo"
            className="rounded-full"
            src="https://pbs.twimg.com/profile_images/1278360830367674368/SfqcgSVD_400x400.jpg"
            width={100}
            height={100}
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <Image
            src="https://res.cloudinary.com/dxjk4gnrw/image/upload/v1698512002/Fidelity-Emblem_epzhfg.png"
            alt="Fidelity Name Logo"
            width={300}
            height={300}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Index;
