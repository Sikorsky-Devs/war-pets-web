import { Home, UserRound } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface UserAvatarProps {
  image?: string | null;
  className?: string;
  size?: number;
  isShelter?: boolean;
}

const UserAvatar = ({ image, className, size = 16, isShelter }: UserAvatarProps) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={image!} />
      <AvatarFallback>
        {isShelter ? (
          <Home size={size} className="text-gray-500" aria-hidden="true" />
        ) : (
          <UserRound size={size} className="text-gray-500" aria-hidden="true" />
        )}
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
