import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const PostCardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex flex-wrap gap-1">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-20" />
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-4/5 mb-1" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-9 w-24" />
      </CardFooter>
    </Card>
  );
};

export default PostCardSkeleton;