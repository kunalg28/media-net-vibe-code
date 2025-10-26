import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Review() {
  const [, setLocation] = useLocation();

  // Since we removed the review step and go directly to dashboard,
  // redirect to dashboard if someone accesses this route
  useEffect(() => {
    setLocation("/dashboard");
  }, [setLocation]);

  return null;
}
