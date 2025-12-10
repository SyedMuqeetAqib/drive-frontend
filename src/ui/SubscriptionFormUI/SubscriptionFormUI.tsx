import "./SubscriptionFormUI.scss";
import PlanCard from "../PlanCard/PlanCard";
import AddonItem from "../AddonItem/AddonItem";
import CardInput from "../../components/CardInput/CardInput";
import StepsAside, { type Step } from "../StepsAside/StepsAside";

// Re-export Step type for backward compatibility
export type { Step };

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
  return (
    <div className="subscription-form-container">
      <div className="steps-aside-container-mobile">
        <StepsAside steps={steps} />
      </div>
      <div className="subscription-form-layout">
        {/* Steps Aside - Desktop sidebar / Mobile dropdown */}
        <div className="steps-aside-container-desktop">
          <StepsAside steps={steps} />
        </div>

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
