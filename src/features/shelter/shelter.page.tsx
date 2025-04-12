"use client";

import { Heart, Mail, MapPin, Send, Star } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import CommentsSection from "@/features/shelter/components/comments-section";
import ShelterInfo from "@/features/shelter/components/shelter-info";
import ShelterPetsList from "@/features/shelter/components/shelter-pets-list";
import ShelterPets from "@/features/shelter-profile/components/shelter-pets";

// Types from the provided interfaces
type AccountType = "SHELTER" | "VOLUNTEER" | "ADMIN";
type ShelterType = "OFFICIAL" | "PRIVATE" | "TEMPORARY";
type PetType =
  | "DOG"
  | "CAT"
  | "BIRD"
  | "FISH"
  | "DOMESTIC"
  | "EXOTIC"
  | "OTHER";
type PetHealthType =
  | "HEALTHY"
  | "INJURED"
  | "SICK"
  | "UNDER_TREATMENT"
  | "DISABLED"
  | "CRITICAL";

interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  middleName: string | null;
  name: string | null;
  accountType: AccountType;
  avatarLink: string | null;
}

interface ShelterUser extends User {
  shelterType: ShelterType;
  address: string | null;
  description: string | null;
  donationLink: string | null;
}

interface Pet {
  id: string;
  shelterId: string;
  volunteerId: string | null;
  isApproved: boolean;
  name: string | null;
  type: PetType;
  breed: string | null;
  age: number;
  address: string | null;
  imageLink: string | null;
  description: string | null;
  shelter?: string | null;
  heathStatus: PetHealthType;
}

interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string | null;
  content: string;
  rating: number;
  createdAt: Date;
}

// Mock data for demonstration
const mockShelter: ShelterUser = {
  id: "shelter-123",
  email: "happypaws@example.com",
  firstName: null,
  lastName: null,
  middleName: null,
  name: "Happy Paws Shelter",
  accountType: "SHELTER",
  avatarLink: "/placeholder.svg?height=100&width=100",
  shelterType: "OFFICIAL",
  address: "123 Animal Care Lane, Pet City",
  description:
    "Happy Paws Shelter is dedicated to rescuing and rehoming animals in need. We provide medical care, shelter, and love to all animals that come through our doors until they find their forever homes.",
  donationLink: "https://donate.example.com/happypaws",
};

const mockPets: Pet[] = [
  {
    id: "pet-1",
    shelterId: "shelter-123",
    volunteerId: null,
    isApproved: true,
    name: "Max",
    type: "DOG",
    breed: "Golden Retriever",
    age: 3,
    address: "123 Animal Care Lane, Pet City",
    imageLink: "/placeholder.svg?height=200&width=300",
    description:
      "Max is a friendly and energetic Golden Retriever who loves to play fetch and go for long walks.",
    heathStatus: "HEALTHY",
  },
  {
    id: "pet-2",
    shelterId: "shelter-123",
    volunteerId: null,
    isApproved: true,
    name: "Luna",
    type: "CAT",
    breed: "Siamese",
    age: 2,
    address: "123 Animal Care Lane, Pet City",
    imageLink: "/placeholder.svg?height=200&width=300",
    description:
      "Luna is a gentle Siamese cat who enjoys lounging in sunny spots and playing with string toys.",
    heathStatus: "HEALTHY",
  },
  {
    id: "pet-3",
    shelterId: "shelter-123",
    volunteerId: "volunteer-1",
    isApproved: true,
    name: "Charlie",
    type: "DOG",
    breed: "Beagle",
    age: 4,
    address: "123 Animal Care Lane, Pet City",
    imageLink: "/placeholder.svg?height=200&width=300",
    description:
      "Charlie is a curious Beagle who loves to explore and has a great sense of smell.",
    heathStatus: "UNDER_TREATMENT",
  },
  {
    id: "pet-4",
    shelterId: "shelter-123",
    volunteerId: null,
    isApproved: true,
    name: "Bella",
    type: "CAT",
    breed: "Maine Coon",
    age: 1,
    address: "123 Animal Care Lane, Pet City",
    imageLink: "/placeholder.svg?height=200&width=300",
    description:
      "Bella is a playful Maine Coon kitten who loves to climb and chase toys.",
    heathStatus: "HEALTHY",
  },
];

const mockComments: Comment[] = [
  {
    id: "comment-1",
    userId: "user-1",
    userName: "John Doe",
    userAvatar: null,
    content:
      "I adopted my dog Max from this shelter and they were incredibly helpful throughout the process. The staff truly cares about the animals.",
    rating: 5,
    createdAt: new Date("2023-05-15"),
  },
  {
    id: "comment-2",
    userId: "user-2",
    userName: "Jane Smith",
    userAvatar: "/placeholder.svg?height=40&width=40",
    content:
      "Great shelter with dedicated staff. They take excellent care of the animals and the facilities are clean.",
    rating: 4,
    createdAt: new Date("2023-06-20"),
  },
];

const ShelterPage = () => {
  const params = useParams();
  const shelterId = params.id as string;

  // In a real application, you would fetch the shelter data based on the ID
  // For now, we'll use the mock data
  const shelter = mockShelter;
  const pets = mockPets;
  const comments = mockComments;

  const [newComment, setNewComment] = useState("");
  const [rating, setRating] = useState(0);

  const handleCommentSubmit = () => {
    // In a real application, you would send this to your API
    console.log("Submitting comment:", {
      shelterId,
      content: newComment,
      rating,
    });
    setNewComment("");
    setRating(0);
  };

  return (
    <div className="mx-auto max-w-screen-xl gap-6 px-4 py-4 sm:px-6 lg:px-8">
      <ShelterInfo />

      <Tabs defaultValue="pets" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="pets">Тварини</TabsTrigger>
          <TabsTrigger value="reviews">Відгуки</TabsTrigger>
        </TabsList>

        <TabsContent value="pets" className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold">Доступні тварини</h2>
          <ShelterPetsList />
        </TabsContent>

        {/* Reviews Tab */}
        <TabsContent value="reviews" className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold">Відгуки</h2>

          <CommentsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShelterPage;
