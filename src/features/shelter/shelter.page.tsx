"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CommentsSection from "@/features/shelter/components/comments-section";
import ShelterInfo from "@/features/shelter/components/shelter-info";
import ShelterPetsList from "@/features/shelter/components/shelter-pets-list";

const ShelterPage = () => {

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

        <TabsContent value="reviews" className="mt-6">
          <h2 className="mb-4 text-2xl font-semibold">Відгуки</h2>

          <CommentsSection />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShelterPage;
