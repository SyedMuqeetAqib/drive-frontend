import React from "react";
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
  const radioRef = React.useRef<HTMLInputElement>(null);

  const handleChange = () => {
    onChange?.(id);
  };

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Prevent default scroll behavior when clicking the label
    e.preventDefault();
    // Manually check the radio and trigger change
    if (radioRef.current) {
      radioRef.current.checked = true;
      handleChange();
    }
  };

  const handleRadioFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // Prevent scroll when radio receives focus by immediately blurring
    // The radio doesn't need to maintain focus for accessibility
    e.target.blur();
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
        ref={radioRef}
        type="radio"
        name="subscription-plan"
        id={`plan-${id}`}
        value={id}
        className="plan-radio"
        defaultChecked={defaultChecked}
        onChange={handleChange}
        onFocus={handleRadioFocus}
      />
      <label
        htmlFor={`plan-${id}`}
        className="plan-label"
        onClick={handleLabelClick}
      />
    </div>
  );
}

export default PlanCard;
