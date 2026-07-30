import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileData from "../components/profile/ProfileData";

export default function EmployeeProfile() {
  return (
    <section className="max-w-7xl mx-auto py-10 space-y-10">
      <ProfileHeader />
      <ProfileData />
    </section>
  );
}
