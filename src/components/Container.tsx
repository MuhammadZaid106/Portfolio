import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className = "", id }: ContainerProps) {
  return (
    <div
      id={id}
      className={`max-w-7xl mx-auto px-6 md:px-10 lg:px-16 w-full relative ${className}`}
    >
      {children}
    </div>
  );
}
