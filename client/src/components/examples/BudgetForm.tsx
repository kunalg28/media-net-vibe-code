import BudgetForm from '../BudgetForm';

export default function BudgetFormExample() {
  return (
    <BudgetForm 
      onNext={(data) => console.log('Budget submitted:', data)}
      onBack={() => console.log('Back clicked')}
    />
  );
}
