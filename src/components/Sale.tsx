"use client";
import React, { useState } from "react";

const Sale = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#000000] py-2 min-h-[38px] w-full flex justify-center items-center text-[#FAFAFA] px-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6">
            <p className="text-[14px] leading-[14px] font-[400] text-center sm:text-left">
              Sign up and get 20% off to your first order.
            </p>
            <h4 className="font-[600] cursor-pointer">
              <u>Sign Up Now</u>
            </h4>
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setIsVisible(false)}
          >
            ✕
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;