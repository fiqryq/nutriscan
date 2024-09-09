import { ISugarGrade } from "@/interface/response";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";

const SugarGrade = (grade: ISugarGrade, loading: boolean) => {
  return ["A", "B", "C", "D", "0"].map((item, index) => {
    if (loading) {
      return <Skeleton key={index} className="w-full h-[90px]" />;
    }
    return (
      <div
        key={index}
        className={cn(
          "w-full h-[90px] text-5xl font-bold text-white flex flex-col items-center justify-center relative",
          item === "A" && "bg-[#045624]",
          item === "B" && "bg-[#81B724]",
          item === "C" && "bg-[#F0A330]",
          item === "D" && "bg-[#B61918]",
          item === "0" && "bg-[#EEEEEE]"
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

const SugarGradeHeaderBadge = (grade: ISugarGrade) => {
  return (
    <div
      className={cn(
        "w-[50px] h-[50px] font-bold flex text-3xl rounded-lg drop-shadow-lg shadow-lg flex-col items-center justify-center relative",
        grade === "A" && "bg-[#045624]  text-white",
        grade === "B" && "bg-[#81B724]  text-white",
        grade === "C" && "bg-[#F0A330]  text-white",
        grade === "D" && "bg-[#B61918]  text-white",
        grade === "0" && "bg-[#EEEEEE] text-black"
      )}
    >
      {grade}
    </div>
  );
};

export { SugarGrade, SugarGradeHeaderBadge };
