import Image from 'next/image'
import React, { ReactNode } from 'react'
import bgImage from "../assets/images/chat-bg.jpg"

interface AuthLayoutProps {
  children: ReactNode; // Explicitly typing `children` as ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-blue-50">
      {/* Left Section */}
      <div className="md:flex-1 relative bg-gradient-to-br from-blue-500 to-blue-400 hidden md:block">
        <div className="absolute inset-0 bg-no-repeat bg-cover bg-center flex items-center justify-center">
          {/* Replace with the actual image */}
          <Image
            src={bgImage}
            alt="Graduates"
            className="h-96 rounded-md object-cover"
            // width={100}
            // height={100}
          />
        </div>
      </div>

      {/* Right Section */}
      {children}
    </div>
  )
}

export default AuthLayout