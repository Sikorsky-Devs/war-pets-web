"use client";

import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { ChevronLeft, ChevronRight, MessageCircle, Search } from "lucide-react";
import { useQueryState } from "nuqs";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSearchRequestsQuery from "@/features/shelter-profile/hooks/use-search-requests-query";
import { type PetSearchRequest } from "@/types/pet";
import { formatHealthStatus, formatPetType } from "@/utils/shelter-pets-utils";
import { getFullName, getUserName } from "@/utils/user-utils";

const ITEMS_PER_PAGE = 5;

const UserSearchRequests = () => {
  const [page, setPage] = useQueryState("page", {
    defaultValue: "1",
    parse: (value) => value,
  });

  const { searchRequests, isLoading } = useSearchRequestsQuery();
  const currentPage = Number(page);

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array(ITEMS_PER_PAGE)
          .fill(0)
          .map((_, index) => (
            <Card key={`skeleton-${index}`}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="h-6 w-32" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <Skeleton className="h-9 w-32" />
                <Skeleton className="h-9 w-40" />
              </CardFooter>
            </Card>
          ))}
      </div>
    );
  }

  if (!searchRequests || searchRequests.length === 0) {
    return (
      <div className="rounded-lg border bg-muted/20 p-12 text-center">
        <p className="text-muted-foreground">Немає запитів на пошук тварин</p>
      </div>
    );
  }

  const totalItems = searchRequests.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRequests = searchRequests.slice(startIndex, endIndex);

  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        {currentRequests.map((request: PetSearchRequest) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">Запит на пошук тварини</h3>
                  <p className="text-sm text-muted-foreground">
                    Від:{" "}
                    {getFullName(
                      request.volunteer.firstName,
                      request.volunteer.lastName,
                      request.volunteer.middleName,
                    )}{" "}
                    •{" "}
                    {format(request.createdAt, "dd MMMM yyyy", { locale: uk })}
                  </p>
                </div>
                <Badge className="bg-purple-500 hover:bg-purple-600">
                  <Search className="mr-1 h-3 w-3" /> Запит на пошук
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Тип тварини
                    </h4>
                    <p>
                      {request.petType
                        ? formatPetType(request.petType)
                        : "Будь-який"}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Порода
                    </h4>
                    <p>{request.breed ?? "Будь-яка"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Віковий діапазон
                    </h4>
                    <p>
                      {request.ageFrom !== null && request.ageTo !== null
                        ? `${request.ageFrom} - ${request.ageTo} років`
                        : request.ageFrom !== null
                          ? `${request.ageFrom}+ років`
                          : request.ageTo !== null
                            ? `До ${request.ageTo} років`
                            : "Будь-який вік"}
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Місцезнаходження
                    </h4>
                    <p>{request.address ?? "Будь-яке місце"}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Стан здоров&#39;я
                    </h4>
                    <p>
                      {request.healthStatus
                        ? formatHealthStatus(request.healthStatus)
                        : "Будь-який"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end border-t pt-4">
              <Button size="sm">
                <MessageCircle className="mr-2 h-4 w-4" /> Чат з користувачем
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(String(currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <Button
                  key={pageNum}
                  variant={pageNum === currentPage ? "default" : "outline"}
                  size="icon"
                  onClick={() => setPage(String(pageNum))}
                >
                  {pageNum}
                </Button>
              ),
            )}
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setPage(String(currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserSearchRequests;
