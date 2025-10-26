import BusinessInfoForm from '../BusinessInfoForm';

export default function BusinessInfoFormExample() {
  return (
    <BusinessInfoForm 
      onNext={(data) => console.log('Business info submitted:', data)}
    />
  );
}
