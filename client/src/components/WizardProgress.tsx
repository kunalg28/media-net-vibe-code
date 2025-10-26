import { Check } from "lucide-react";

interface WizardProgressProps {
  currentStep: number;
  steps: string[];
}

export default function WizardProgress({ currentStep, steps }: WizardProgressProps) {
  return (
    <div className="w-full bg-card border-b border-card-border sticky top-0 z-50 py-4 shadow-md">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-lg font-bold text-primary">
              Step {currentStep}/{steps.length}
            </div>
            <div className="hidden sm:block text-sm text-muted-foreground">
              {steps[currentStep - 1]}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div key={step} className="flex items-center">
                  {index > 0 && (
                    <div className={`w-12 h-0.5 ${isCompleted ? 'bg-primary' : 'bg-border'}`} />
                  )}
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all ${
                        isCompleted
                          ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                          : isCurrent
                          ? 'border-primary text-primary bg-primary/5'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-bold">{stepNumber}</span>
                      )}
                    </div>
                    <span
                      className={`text-xs font-medium hidden lg:block ${
                        isCurrent ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                    >
                      {step}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
