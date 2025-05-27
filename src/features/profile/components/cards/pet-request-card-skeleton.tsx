import { Skeleton } from "@/components/ui/skeleton";

const PetRequestSkeleton = () => {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      <div className="flex items-start gap-4">
        <Skeleton className="h-24 w-24 rounded-md" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <Skeleton className="h-9 w-24" />
        <Skeleton className="h-9 w-24" />
      </div>
    </div>
  );
};

export default PetRequestSkeleton;