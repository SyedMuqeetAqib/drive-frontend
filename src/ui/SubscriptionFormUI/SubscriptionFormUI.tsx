import "./SubscriptionFormUI.scss";
import PlanCard from "../PlanCard/PlanCard";
import AddonItem from "../AddonItem/AddonItem";
import CardInput from "../../components/CardInput/CardInput";

// Types
export interface Step {
  id: string;
  label: string;
  completed: boolean;
  active?: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  features: Array<{ text: string; icon: string }>;
}

export interface Addon {
  id: string;
  name: string;
  disabled: boolean;
  comingSoon: boolean;
}

export interface SubscriptionFormUIProps {
  steps: Step[];
  plans: Plan[];
  addons: Addon[];
  selectedPlan: string;
  selectedAddons: Set<string>;
  onPlanChange: (planId: string) => void;
  onAddonToggle: (id: string) => void;
  onNext?: () => void;
}

// Pure UI Component
function SubscriptionFormUI({
  steps,
  plans,
  addons,
  selectedPlan,
  selectedAddons,
  onPlanChange,
  onAddonToggle,
  onNext,
}: SubscriptionFormUIProps) {
  const renderStepIndicator = (step: Step) => {
    const isActive = step.active === true;
    const isCompleted = step.completed === true;

    return (
      <li
        key={step.id}
        className={`step-item ${isActive ? "active" : ""} ${
          isCompleted ? "completed" : ""
        }`}
      >
        <span className="step-label">{step.label}</span>

        {isCompleted && !isActive && (
          <svg
            className="checkmark-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9" fill="#026786" />
            <path
              d="M6 10L9 13L14 7"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {isActive && <div className="active-indicator" />}
      </li>
    );
  };

  return (
    <div className="subscription-form-container">
      <div className="subscription-form-layout">
        {/* Left Sidebar - Step Indicators */}
        <aside className="steps-sidebar">
          <ul className="steps-list">{steps.map(renderStepIndicator)}</ul>
        </aside>

        {/* Main Form Content */}
        <div className="form-content">
          {/* Subscription Plans Section */}
          <div className="form-section-header">
            <h2 className="section-title">Subscription plan</h2>
            <p className="form-subtitle">
              Select the ideal subscription plan for your listing.
            </p>
          </div>

          <div className="form-section-content">
            <h1 className="form-title">Select your plan</h1>
            <section>
              <div className="plans-grid">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    id={plan.id}
                    name={plan.name}
                    price={plan.price}
                    features={plan.features}
                    selected={selectedPlan === plan.id}
                    defaultChecked={plan.id === "best-mates"}
                    onChange={onPlanChange}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Add-ons Section */}
          <div className="form-section-content">
            <section>
              <h2 className="form-title">
                Select add-ons for your subscription
              </h2>
              <div className="addons-list">
                {addons.map((addon) => (
                  <AddonItem
                    key={addon.id}
                    id={addon.id}
                    name={addon.name}
                    checked={selectedAddons.has(addon.id)}
                    disabled={addon.disabled}
                    comingSoon={addon.comingSoon}
                    onChange={onAddonToggle}
                  />
                ))}
              </div>
            </section>
          </div>

          {/* Payment Details Section */}
          <div className="form-section-content">
            <section>
              <h2 className="form-title">Add card details</h2>
              <div className="payment-form">
                <CardInput />
              </div>
              <p className="payment-note">
                You will not be charged right now. Subscription will only start
                once your listing is published and live.
              </p>
            </section>
          </div>

          {/* Info Text */}
          <div>
            <div className="form-info">
              <p>
                Learn more about the plans here -{" "}
                <a href="#" className="info-link">
                  What is the right plan for me?
                </a>
              </p>
              <p>
                You will be able to switch between plans easily later as well.
                Speak to our host success team if you need any clarifications.
              </p>
            </div>
          </div>

          {/* Next Button */}
          <div className="form-actions">
            <button type="button" className="btn-next" onClick={onNext}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionFormUI;
