import React from "react";

const Container = ({ children, className }) => {
  return (
    <div className={`flex flex-1 p-10 ${className}`}>
      <div className="max-w-7xl w-full mx-auto bg-white rounded-md shadow-lg p-4">
        {children}
      </div>
    </div>
  );
};

export default Container;
