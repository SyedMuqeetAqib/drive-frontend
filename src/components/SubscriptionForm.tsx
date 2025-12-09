import { useState } from "react";
import "./SubscriptionForm.scss";
import PlanCard from "./PlanCard";
import lockIcon from "../assets/icons/Lock.svg";
import eIcon from "../assets/icons/e.svg";
import groupIcon from "../assets/icons/Group 5171.svg";

function SubscriptionForm() {
  const [selectedPlan, setSelectedPlan] = useState("best-mates");

  const steps = [
    { id: "location", label: "Location", completed: true },
    { id: "about", label: "About", completed: true },
    { id: "features", label: "Features", completed: true },
    { id: "rules", label: "Rules", completed: true },
    { id: "pricing", label: "Pricing", completed: true },
    { id: "promotion", label: "Promotion", completed: true },
    { id: "pictures", label: "Pictures", completed: true },
    { id: "insurance", label: "Insurance", completed: true },
    {
      id: "subscription",
      label: "Subscription",
      completed: false,
      active: true,
    },
    { id: "device", label: "Device", completed: false },
    { id: "easy-access", label: "Easy Access", completed: false },
  ];

  const plans = [
    {
      id: "just-mates",
      name: "Just mates",
      price: "Free",
      features: [
        {
          text: "Bring your own GPS",
          icon: groupIcon,
        },
        {
          text: "Mileage reporting to be done by you",
          icon: eIcon,
        },
        {
          text: "In-person key handover to guests",
          icon: lockIcon,
        },
      ],
    },
    {
      id: "good-mates",
      name: "Good mates",
      price: "$10/month",
      features: [
        {
          text: "Primary GPS included",
          icon: lockIcon,
        },
        {
          text: "Automated mileage calculations",
          icon: eIcon,
        },
        {
          text: "In-person key handover to guests",
          icon: groupIcon,
        },
      ],
    },
    {
      id: "best-mates",
      name: "Best mates",
      price: "$30/month",
      features: [
        {
          text: "Keyless access technology",
          icon: lockIcon,
        },
        {
          text: "Automated mileage calculations",
          icon: eIcon,
        },
        {
          text: "Remote handover to guests",
          icon: groupIcon,
        },
      ],
    },
  ];

  return (
    <div className="subscription-form-container">
      <div className="subscription-form-layout">
        {/* Left Sidebar - Step Indicators */}
        <aside className="steps-sidebar">
          <ul className="steps-list">
            {steps.map((step) => (
              <li
                key={step.id}
                className={`step-item ${step.active ? "active" : ""} ${
                  step.completed ? "completed" : ""
                }`}
              >
                {step.completed && !step.active && (
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
                {step.active && <div className="active-indicator" />}
                <span className="step-label">{step.label}</span>
              </li>
            ))}
          </ul>
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
            <section className="form-section">
              {/* Add here a vertical line */}
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
                    onChange={setSelectedPlan}
                  />
                ))}
              </div>
            </section>

            {/* Add-ons Section */}
            <section className="form-section">
              <h2 className="form-title">
                Select add-ons for your subscription
              </h2>
              <div className="addons-list">
                <div className="addon-item">
                  <input
                    type="checkbox"
                    id="addon-gps"
                    name="addons"
                    value="gps"
                    className="addon-checkbox"
                  />
                  <label htmlFor="addon-gps" className="addon-label">
                    <span className="addon-name">BYO secondary GPS</span>
                    <span className="addon-price">$5/month</span>
                  </label>
                </div>

                <div className="addon-item addon-item-disabled">
                  <div className="coming-soon-badge">Coming soon</div>
                  <input
                    type="checkbox"
                    id="addon-insurance"
                    name="addons"
                    value="insurance"
                    className="addon-checkbox"
                    disabled
                  />
                  <label htmlFor="addon-insurance" className="addon-label">
                    <span className="addon-name">Between trip insurance</span>
                  </label>
                </div>
              </div>
            </section>

            {/* Payment Details Section */}
            <section className="form-section">
              <h2 className="section-title">Add card details</h2>
              <div className="payment-form">
                <div className="form-group">
                  <label htmlFor="card-number" className="form-label">
                    Card Number
                  </label>
                  <div className="input-wrapper">
                    <input
                      type="text"
                      id="card-number"
                      name="card-number"
                      placeholder="1234 5678 1234 5678"
                      className="form-input"
                    />
                    <svg
                      className="card-icon"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="2"
                        y="5"
                        width="20"
                        height="14"
                        rx="2"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path
                        d="M2 10H22"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="expiry-date" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiry-date"
                      name="expiry-date"
                      placeholder="MM/YY"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cvc" className="form-label">
                      CVC
                    </label>
                    <input
                      type="text"
                      id="cvc"
                      name="cvc"
                      placeholder="CVC"
                      className="form-input"
                    />
                  </div>
                </div>

                <p className="payment-note">
                  You will not be charged right now. Subscription will only
                  start once your listing is published and live.
                </p>
              </div>
            </section>

            {/* Info Text */}
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
