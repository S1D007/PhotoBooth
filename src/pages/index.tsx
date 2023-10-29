import FramePreview from '@/components/Home/FramePreview'
import Frames from '@/components/Home/Frames'
import Logo from '@/components/common/Logo'
import Wrapper from '@/components/common/Wrapper'
import React from 'react'
import frame1 from "../assets/frame1.png";
import frame2 from "../assets/frame2.png";
import frame3 from "../assets/frame3.png";

const index = () => {
  return (
    <Wrapper>
      <Logo />
      <FramePreview />
      <Frames frames={[frame1, frame2, frame3]} />
    </Wrapper>
  )
}

export default index