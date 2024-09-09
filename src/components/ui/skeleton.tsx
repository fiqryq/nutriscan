import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse bg-muted", className)} {...props} />;
}
function HeaderSkeleton() {
  return <Skeleton className="w-full h-[300px]" />;
}
function NutritionTitleSkeleton() {
  return <Skeleton className="w-full h-4 mb-2 rounded-md" />;
}
function NutritionSkeleton() {
  return (
    <div className="inline-flex justify-between w-full mt-5">
      <div>
        <Skeleton className="w-18 h-18 mb-2 rounded-xl" />
        <Skeleton className="w-full h-3 rounded-xl" />
      </div>
      <div>
        <Skeleton className="w-18 h-18 mb-2 rounded-xl" />
        <Skeleton className="w-full h-3 rounded-xl" />
      </div>
      <div>
        <Skeleton className="w-18 h-18 mb-2 rounded-xl" />
        <Skeleton className="w-full h-3 rounded-xl" />
      </div>
      <div>
        <Skeleton className="w-18 h-18 mb-2 rounded-xl" />
        <Skeleton className="w-full h-3 rounded-xl" />
      </div>
      <div>
        <Skeleton className="w-18 h-18 mb-2 rounded-xl" />
        <Skeleton className="w-full h-3 rounded-xl" />
      </div>
    </div>
  );
}
export { Skeleton, NutritionSkeleton, NutritionTitleSkeleton, HeaderSkeleton };
