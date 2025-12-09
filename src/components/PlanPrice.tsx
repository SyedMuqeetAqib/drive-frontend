interface PlanPriceProps {
  price: string;
}

function PlanPrice({ price }: PlanPriceProps) {
  // Check if price is "Free"
  if (price.toLowerCase() === "free") {
    return <p className="plan-price">{price}</p>;
  }

  // Check if price contains "/month" or "/mo"
  const monthMatch = price.match(/^(\$[\d,]+\.?\d*)\s*\/\s*month?$/i);

  if (monthMatch) {
    const amount = monthMatch[1];
    return (
      <p className="plan-price">
        <span className="plan-price-amount">{amount}</span>
        <span className="plan-price-period">/month</span>
      </p>
    );
  }

  // Default: render as-is
  return <p className="plan-price">{price}</p>;
}

export default PlanPrice;
