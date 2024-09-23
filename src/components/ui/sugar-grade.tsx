import { cn } from "@/lib/utils";
import React from "react";

const SugarGrade: React.FC<{
  grade: string;
}> = ({ grade }) => {
  return ["A", "B", "C", "D", "E"].map((item, index) => {
    return (
      <div
        key={index}
        className={cn(
          "w-full h-[90px] text-5xl font-bold text-white flex flex-col items-center justify-center relative",
          item === "A" && "bg-[#045624] rounded-l-lg",
          item === "B" && "bg-[#81B724]",
          item === "C" && "bg-[#F0A330]",
          item === "D" && "bg-[#B61918]",
          item === "E" && "bg-[#6e0c0c] rounded-r-lg"
        )}
      >
        {item === grade ? (
          <div className=" border-8 border-black w-[70px] h-[70px] rounded-full absolute" />
        ) : null}
        {item}
      </div>
    );
  });
};

export { SugarGrade };
