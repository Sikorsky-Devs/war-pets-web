import CallToAction from "@/features/home/components/call-to-action";
import Features from "@/features/home/components/features";
import Hero from "@/features/home/components/hero";
import HowItWorks from "@/features/home/components/how-it-works";
import PetStories from "@/features/home/components/pet-stories";
import Shelters from "@/features/home/components/shelters";
import Stats from "@/features/home/components/stats";

const HomePage = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grid w-full flex-1 place-items-center">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <Shelters />
        <PetStories />
        <CallToAction />
      </main>
    </div>
  );
};

export default HomePage;
