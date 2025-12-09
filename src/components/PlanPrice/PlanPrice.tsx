import './PlanPrice.scss';

interface PlanPriceProps {
  price: string;
}

function PlanPrice({ price }: PlanPriceProps) {
  const isFree = price.toLowerCase() === 'free';
  const monthMatch = price.match(/^(\$[\d,]+\.?\d*)\s*\/\s*month?$/i);

  if (isFree) {
    return <p className="plan-price">{price}</p>;
  }

  if (monthMatch) {
    const amount = monthMatch[1];
    return (
      <p className="plan-price">
        <span className="plan-price-amount">{amount}</span>
        <span className="plan-price-period">/month</span>
      </p>
    );
  }

  return <p className="plan-price">{price}</p>;
}

export default PlanPrice;

