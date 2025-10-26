import TargetingForm from '../TargetingForm';

export default function TargetingFormExample() {
  return (
    <TargetingForm 
      onNext={(data) => console.log('Targeting submitted:', data)}
      onBack={() => console.log('Back clicked')}
    />
  );
}
