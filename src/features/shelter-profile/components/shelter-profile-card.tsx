import {Globe, LogOut, Mail, MapPin, Phone} from "lucide-react";
import Link from "next/link";
import {useRouter} from "next/navigation";

import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Routes} from "@/constants/navigation";
import useAuthStore from "@/store/use-auth-store";
import {logoutUser, removeAuthToken} from "@/utils/auth-utils";

const ShelterProfileCard = () => {
  const { replace } = useRouter();
  
  const handleSignOut = () => {
    removeAuthToken();
    replace(Routes.Home);
    logoutUser();
  };

  const shelterData = {
    id: "shelter-123",
    name: "Happy Paws Shelter",
    email: "info@happypaws.org",
    phone: "+1 (555) 123-4567",
    location: "Kyiv, Ukraine",
    website: "https://happypaws.org",
    status: "Притулок",
  }
  
  return (
    <Card className="h-fit">
      <CardHeader className="relative pb-0">
        <Badge className="absolute right-6 top-6 bg-orange-500 hover:bg-orange-600">{shelterData.status}</Badge>
        <div className="flex justify-center">
          <div className="relative h-24 w-24 rounded-full bg-muted flex items-center justify-center">
            <span className="text-4xl text-muted-foreground">🏠</span>
          </div>
        </div>
        <CardTitle className="text-center mt-2">{shelterData.name}</CardTitle>
        <CardDescription className="text-center">{shelterData.email}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{shelterData.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-muted-foreground" />
          <span>{shelterData.phone}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>{shelterData.location}</span>
        </div>
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4 text-muted-foreground" />
          <Link href={shelterData.website} className="text-primary hover:underline">
            {shelterData.website}
          </Link>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          variant="destructive"
          className="w-full"
          onClick={handleSignOut}
        >
          <LogOut className="mr-2 h-4 w-4" /> Вийти
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ShelterProfileCard;