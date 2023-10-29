import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper:React.FC<WrapperProps> = ({children}) => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center space-y-2">
      {children}
    </div>
  );
};

export default Wrapper;
