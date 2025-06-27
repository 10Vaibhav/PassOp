import React from "react";

const Footer = () => {
  return (
    <div className="bg-slate-800 text-white flex flex-col justify-center items-center">
      <div className="logo font-bold text-2xl">
        <span className="text-green-500"> &lt;</span>
        Pass
        <span className="text-green-500">Op/ &gt;</span>
      </div>
      <div className="flex justify-center items-center">
        Created with <img className="w-[18px] mx-2 py-2" src="icons/heart.png" alt="heart icon" /> by Vaibhav
      </div>
    </div>
  );
};

export default Footer;
