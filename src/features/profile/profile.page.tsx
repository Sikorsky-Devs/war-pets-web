"use client";

import AboutMeCard from "@/features/profile/components/about-me-card";
import ConnectionsCard from "@/features/profile/components/connections-card";
import LatestActivityCard from "@/features/profile/components/latest-activity-card";
import ProfileCard from "@/features/profile/components/profile-card";
import ProfileCompletionCard from "@/features/profile/components/profile-completion-card";
import SkillsCard from "@/features/profile/components/skills-card";

import { profileData } from "../../../data/profile-data";

const ProfilePage = () => {
  const { profileCompletion, skills, activities, aboutMe, connections } =
    profileData;

  return (
    <div className="mx-auto grid max-w-screen-xl grid-cols-1 gap-6 px-4 py-4 sm:px-6 md:grid-cols-3 lg:px-8">
      <div className="space-y-6 md:col-span-1">
        <ProfileCard />

        <ProfileCompletionCard
          title={profileCompletion.title}
          progress={profileCompletion.progress}
        />

        <SkillsCard title={skills.title} skills={skills.list} />
      </div>

      <div className="space-y-6 md:col-span-2">
        <LatestActivityCard
          title={activities.title}
          viewAllLink={activities.viewAllLink}
          activities={activities.list}
        />

        <AboutMeCard
          title={aboutMe.title}
          highlightedText={aboutMe.highlightedText}
          regularText={aboutMe.regularText}
        />

        <ConnectionsCard
          title={connections.title}
          connections={connections.list}
        />
      </div>
    </div>
  );
};

export default ProfilePage;
