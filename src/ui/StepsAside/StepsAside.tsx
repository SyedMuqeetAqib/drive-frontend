import "./StepsAside.scss";
import { useState, useRef, useEffect } from "react";

export interface Step {
  id: string;
  label: string;
  completed: boolean;
  active?: boolean;
}

export interface StepsAsideProps {
  steps: Step[];
  onStepSelect?: (stepId: string) => void;
}

function StepsAside({ steps, onStepSelect }: StepsAsideProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const activeStep = steps.find((step) => step.active) || steps[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleStepSelect = (stepId: string) => {
    setIsDropdownOpen(false);
    if (onStepSelect) {
      onStepSelect(stepId);
    }
    // Scroll to the step if needed
    const stepElement = document.querySelector(`[data-step-id="${stepId}"]`);
    if (stepElement) {
      stepElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

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
    <>
      {/* Mobile Dropdown */}
      <div className="steps-dropdown-mobile" ref={dropdownRef}>
        <button
          type="button"
          className="steps-dropdown-trigger"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          aria-expanded={isDropdownOpen}
          aria-haspopup="listbox"
        >
          <span className="dropdown-text">{activeStep.label}</span>
          <svg
            className={`dropdown-chevron ${isDropdownOpen ? "open" : ""}`}
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L6 6L11 1"
              stroke="#4A4A4A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="steps-dropdown-menu">
            {steps.map((step) => (
              <button
                key={step.id}
                type="button"
                className={`dropdown-item ${step.active ? "active" : ""} ${
                  step.completed ? "completed" : ""
                }`}
                onClick={() => handleStepSelect(step.id)}
              >
                <span className="dropdown-item-label">{step.label}</span>
                {step.completed && !step.active && (
                  <svg
                    className="dropdown-checkmark"
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
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <aside className="steps-sidebar">
        <ul className="steps-list">{steps.map(renderStepIndicator)}</ul>
      </aside>
    </>
  );
}

export default StepsAside;
