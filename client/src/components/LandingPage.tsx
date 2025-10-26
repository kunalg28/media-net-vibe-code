import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Sparkles, Shield, Clock } from "lucide-react";
import heroImage from "@assets/generated_images/Small_business_owners_creating_ad_campaigns_6177f752.png";

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <div
        className="relative bg-cover bg-center py-20 md:py-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url(${heroImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Launch Your First Ad Campaign in 10 Minutes
          </h1>
          <p className="text-2xl md:text-3xl text-white/95 mb-8 font-medium">
            No Expertise Required
          </p>
          <Button
            size="lg"
            onClick={onGetStarted}
            className="text-lg px-10 py-7 h-auto bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-lg"
            data-testid="button-get-started"
          >
            <Rocket className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Clock className="w-8 h-8 text-green-400" />
              <span className="font-semibold text-white">Fast Setup</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Sparkles className="w-8 h-8 text-green-400" />
              <span className="font-semibold text-white">AI-Powered</span>
            </div>
            <div className="flex flex-col items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <Shield className="w-8 h-8 text-green-400" />
              <span className="font-semibold text-white">Budget-Safe</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Up Your Business</h3>
              <p className="text-muted-foreground">
                Tell us about your business, website, and campaign goals
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Target Your Audience</h3>
              <p className="text-muted-foreground">
                Choose who sees your ads with pre-built audience templates
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Set Your Budget</h3>
              <p className="text-muted-foreground">
                Control your spending with flexible daily and monthly budgets
              </p>
            </CardContent>
          </Card>
        </div>


        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="py-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-4">
              Ready to Grow Your Business?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of small businesses using our platform to reach more customers
            </p>
            <Button
              size="lg"
              onClick={onGetStarted}
              className="text-lg px-10 py-7 h-auto bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-lg"
              data-testid="button-get-started-footer"
            >
              <Rocket className="w-5 h-5 mr-2" />
              Get Started Now
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
