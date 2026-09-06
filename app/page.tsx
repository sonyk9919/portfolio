import { PortfolioShell } from "@/components/PortfolioShell";
import { getNavigator, getProfile, getWorkGroups } from "@/lib/content";

const Home = async () => {
  const [navigator, profile, workGroups] = await Promise.all([
    getNavigator(),
    getProfile(),
    getWorkGroups(),
  ]);

  return (
    <PortfolioShell
      navigator={navigator}
      profile={profile}
      workGroups={workGroups}
    />
  );
};

export default Home;
