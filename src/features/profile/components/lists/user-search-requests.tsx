"use client";

import { format } from "date-fns";
import { uk } from "date-fns/locale/uk";
import { MessageCircle, Search } from "lucide-react";

import { getUser } from "@/api/users/users.api";
import { PaginationControls } from "@/components/pagination/pagination-controls";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useSearchRequestsQuery from "@/features/profile/hooks/use-search-requests-query";
import { usePagination } from "@/hooks/use-pagination";
import useChatStore from "@/store/use-chat-store";
import { type PetSearchRequest } from "@/types/models/pet";
import { formatHealthStatus, formatPetType } from "@/utils/shelter-pets-utils";
import { getFullName } from "@/utils/user-utils";

const ITEMS_PER_PAGE = 5;

const UserSearchRequests = () => {
  const { setIsChatOpen, setReceiverId, addChat } = useChatStore();
  const { searchRequests = [], isLoading } = useSearchRequestsQuery();

  const { currentPage, totalPages, handlePageChange, currentItems } =
    usePagination({
      totalItems: searchRequests.length,
      itemsPerPage: ITEMS_PER_PAGE,
    });

  const handleOpenChat = async (receiverId: string) => {
    const user = await getUser(receiverId);
    addChat(user);
    setReceiverId(receiverId);
    setIsChatOpen(true);
  };

  const currentRequests = currentItems(searchRequests);

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
              <Button
                onClick={() => handleOpenChat(request.volunteer.id)}
                size="sm"
              >
                <MessageCircle className="mr-2 h-4 w-4" /> Чат з користувачем
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="mt-8">
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default UserSearchRequests;
