import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ProfileCardSkeleton = () => {
  return (
    <Card>
      <CardContent className="space-y-4 pt-6">
        <div className="relative">
          <Skeleton className="absolute -left-2 -top-2 h-6 w-20" />
          <div className="flex flex-col items-center">
            <div>
              <Skeleton className="h-24 w-24 rounded-full" />
            </div>
            <Skeleton className="mt-2 h-8 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>

        <div className="space-y-2.5">
          {[1, 2, 3].map((index) => (
            <div key={index} className="flex items-center gap-3">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-32" />
            </div>
          ))}
        </div>

        <div className="flex w-full gap-2">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCardSkeleton; 