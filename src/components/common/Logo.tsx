import { Image } from '@nextui-org/react'
import React from 'react'
import NextImage from 'next/image'
const Logo = () => {
  return (
    <div className="flex flex-row space-x-2 justify-center items-end">
        <Image
          as={NextImage}
          alt="Fidelity Logo"
          className="rounded-full"
          src="https://pbs.twimg.com/profile_images/1278360830367674368/SfqcgSVD_400x400.jpg"
          width={100}
          height={100}
        />
        <Image
          as={NextImage}
          src="https://res.cloudinary.com/dxjk4gnrw/image/upload/v1698512002/Fidelity-Emblem_epzhfg.png"
          alt="Fidelity Name Logo"
          width={300}
          height={300}
        />
      </div>
  )
}

export default Logo