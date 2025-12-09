import { useState } from "react";
import "./SubscriptionForm.scss";
import PlanCard from "../PlanCard/PlanCard";
import AddonItem from "../AddonItem/AddonItem";
import CardInput from "../CardInput/CardInput";
import lockIcon from "../../assets/icons/Lock.svg";
import eIcon from "../../assets/icons/e.svg";
import groupIcon from "../../assets/icons/Group 5171.svg";

// Constants
const FORM_STEPS = [
  { id: "location", label: "Location", completed: true },
  { id: "about", label: "About", completed: true },
  { id: "features", label: "Features", completed: true },
  { id: "rules", label: "Rules", completed: true },
  { id: "pricing", label: "Pricing", completed: true },
  { id: "promotion", label: "Promotion", completed: true },
  { id: "pictures", label: "Pictures", completed: true },
  { id: "insurance", label: "Insurance", completed: true },
  { id: "subscription", label: "Subscription", completed: false, active: true },
  { id: "device", label: "Device", completed: false },
  { id: "easy-access", label: "Easy Access", completed: false },
];

const SUBSCRIPTION_PLANS = [
  {
    id: "just-mates",
    name: "Just mates",
    price: "Free",
    features: [
      { text: "Bring your own GPS", icon: groupIcon },
      { text: "Mileage reporting to be done by you", icon: eIcon },
      { text: "In-person key handover to guests", icon: lockIcon },
    ],
  },
  {
    id: "good-mates",
    name: "Good mates",
    price: "$10/month",
    features: [
      { text: "Primary GPS included", icon: lockIcon },
      { text: "Automated mileage calculations", icon: eIcon },
      { text: "In-person key handover to guests", icon: groupIcon },
    ],
  },
  {
    id: "best-mates",
    name: "Best mates",
    price: "$30/month",
    features: [
      { text: "Keyless access technology", icon: lockIcon },
      { text: "Automated mileage calculations", icon: eIcon },
      { text: "Remote handover to guests", icon: groupIcon },
    ],
  },
];

const ADDONS = [
  {
    id: "addon-gps",
    name: "BYO secondary GPS - $5/month",
    disabled: false,
    comingSoon: false,
  },
  {
    id: "addon-insurance",
    name: "Between trip insurance",
    disabled: true,
    comingSoon: true,
  },
];

function SubscriptionForm() {
  const [selectedPlan, setSelectedPlan] = useState("best-mates");
  const [selectedAddons, setSelectedAddons] = useState<Set<string>>(new Set());

  const handleAddonToggle = (id: string, checked: boolean) => {
    setSelectedAddons((prev) => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(id);
      } else {
        newSet.delete(id);
      }
      return newSet;
    });
  };

  const renderStepIndicator = (step: (typeof FORM_STEPS)[0]) => {
    const isActive = step.active === true;
    const isCompleted = step.completed === true;

    return (
      <li
        key={step.id}
        className={`step-item ${isActive ? "active" : ""} ${
          isCompleted ? "completed" : ""
        }`}
      >
        {isCompleted && !isActive && (
          <svg
            className="checkmark-icon"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="9" fill="#4CAF50" />
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
        <span className="step-label">{step.label}</span>
      </li>
    );
  };

  return (
    <div className="subscription-form-container">
      <div className="subscription-form-layout">
        {/* Left Sidebar - Step Indicators */}
        <aside className="steps-sidebar">
          <ul className="steps-list">{FORM_STEPS.map(renderStepIndicator)}</ul>
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
                {SUBSCRIPTION_PLANS.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    id={plan.id}
                    name={plan.name}
                    price={plan.price}
                    features={plan.features}
                    selected={selectedPlan === plan.id}
                    defaultChecked={plan.id === "best-mates"}
                    onChange={setSelectedPlan}
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
                {ADDONS.map((addon) => (
                  <AddonItem
                    key={addon.id}
                    id={addon.id}
                    name={addon.name}
                    checked={selectedAddons.has(addon.id)}
                    disabled={addon.disabled}
                    comingSoon={addon.comingSoon}
                    onChange={handleAddonToggle}
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
            <button type="button" className="btn-next">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionForm;
