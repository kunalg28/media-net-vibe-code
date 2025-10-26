import WizardProgress from '../WizardProgress';

export default function WizardProgressExample() {
  return (
    <WizardProgress 
      currentStep={2} 
      steps={['Business Info', 'Targeting', 'Budget']} 
    />
  );
}
