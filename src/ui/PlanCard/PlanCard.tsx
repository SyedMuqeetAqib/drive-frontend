import PlanPrice from "../PlanPrice/PlanPrice";
import "./PlanCard.scss";

interface Feature {
  text: string;
  icon?: string;
}

interface PlanCardProps {
  id: string;
  name: string;
  price: string;
  features: Feature[];
  selected?: boolean;
  defaultChecked?: boolean;
  onChange?: (value: string) => void;
}

function PlanCard({
  id,
  name,
  price,
  features,
  selected = false,
  defaultChecked = false,
  onChange,
}: PlanCardProps) {
  const handleChange = () => {
    onChange?.(id);
  };

  return (
    <div className={`plan-card ${selected ? "plan-card-selected" : ""}`}>
      <h3 className="plan-name">{name}</h3>

      <ul className="plan-features">
        {features.map((feature, index) => (
          <li key={index} className="plan-feature-item">
            {feature.icon && (
              <img src={feature.icon} alt="" className="plan-feature-icon" />
            )}
            <span className="plan-feature-text">{feature.text}</span>
          </li>
        ))}
      </ul>

      <PlanPrice price={price} />

      <input
        type="radio"
        name="subscription-plan"
        id={`plan-${id}`}
        value={id}
        className="plan-radio"
        defaultChecked={defaultChecked}
        onChange={handleChange}
      />
      <label htmlFor={`plan-${id}`} className="plan-label" />
    </div>
  );
}

export default PlanCard;
