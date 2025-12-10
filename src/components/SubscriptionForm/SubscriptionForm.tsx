import SubscriptionFormUI from "../../ui/SubscriptionFormUI/SubscriptionFormUI";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setSelectedPlan,
  toggleAddon,
} from "../../store/slices/subscriptionSlice";
import {
  FORM_STEPS,
  SUBSCRIPTION_PLANS,
  ADDONS,
} from "../../constants/subscriptionConstants";

function SubscriptionForm() {
  const dispatch = useAppDispatch();
  const selectedPlan = useAppSelector(
    (state) => state.subscription.selectedPlan
  );
  const selectedAddons = useAppSelector(
    (state) => state.subscription.selectedAddons
  );
  const selectedAddonsSet = new Set(selectedAddons);

  const handlePlanChange = (planId: string) => {
    dispatch(setSelectedPlan(planId));
  };

  const handleAddonToggle = (id: string) => {
    dispatch(toggleAddon(id));
  };

  return (
    <SubscriptionFormUI
      steps={FORM_STEPS}
      plans={SUBSCRIPTION_PLANS}
      addons={ADDONS}
      selectedPlan={selectedPlan}
      selectedAddons={selectedAddonsSet}
      onPlanChange={handlePlanChange}
      onAddonToggle={handleAddonToggle}
    />
  );
}

export default SubscriptionForm;
