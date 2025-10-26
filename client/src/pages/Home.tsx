import { useLocation } from "wouter";
import LandingPage from "@/components/LandingPage";

export default function Home() {
  const [, setLocation] = useLocation();

  return (
    <LandingPage onGetStarted={() => setLocation("/campaign/wizard")} />
  );
}
