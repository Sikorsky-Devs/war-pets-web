import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ShelterCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 w-full overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <CardHeader className="p-4 pb-0">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center mt-1">
          <Skeleton className="h-4 w-16" />
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <Skeleton className="h-5 w-24 mb-3" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4 mt-2" />
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Skeleton className="h-9 w-20 mr-2" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
};

export default ShelterCardSkeleton;