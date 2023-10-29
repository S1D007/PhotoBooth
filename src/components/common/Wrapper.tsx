import React from "react";

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper:React.FC<WrapperProps> = ({children}) => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center space-y-2 pt-20">
      {children}
    </div>
  );
};

export default Wrapper;
