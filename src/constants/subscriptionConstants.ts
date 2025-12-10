import type { Step, Plan, Addon } from "../ui/SubscriptionFormUI/SubscriptionFormUI";
import lockIcon from "../assets/icons/Lock.svg";
import eIcon from "../assets/icons/e.svg";
import groupIcon from "../assets/icons/Group 5171.svg";

// Form Steps
export const FORM_STEPS: Step[] = [
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

// Subscription Plans
export const SUBSCRIPTION_PLANS: Plan[] = [
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

// Add-ons
export const ADDONS: Addon[] = [
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

// Default selected plan
export const DEFAULT_SELECTED_PLAN = "best-mates";
