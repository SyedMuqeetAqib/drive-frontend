import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface SubscriptionState {
  selectedPlan: string;
  selectedAddons: string[];
  cardDetails: {
    cardNumber: string;
    expiry: string;
    cvc: string;
  };
}

const initialState: SubscriptionState = {
  selectedPlan: "best-mates",
  selectedAddons: [],
  cardDetails: {
    cardNumber: "",
    expiry: "",
    cvc: "",
  },
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    setSelectedPlan: (state, action: PayloadAction<string>) => {
      state.selectedPlan = action.payload;
    },
    toggleAddon: (state, action: PayloadAction<string>) => {
      const addonId = action.payload;
      const index = state.selectedAddons.indexOf(addonId);
      if (index > -1) {
        state.selectedAddons.splice(index, 1);
      } else {
        state.selectedAddons.push(addonId);
      }
    },
    setCardNumber: (state, action: PayloadAction<string>) => {
      state.cardDetails.cardNumber = action.payload;
    },
    setExpiry: (state, action: PayloadAction<string>) => {
      state.cardDetails.expiry = action.payload;
    },
    setCvc: (state, action: PayloadAction<string>) => {
      state.cardDetails.cvc = action.payload;
    },
    resetSubscription: (state) => {
      state.selectedPlan = initialState.selectedPlan;
      state.selectedAddons = [];
      state.cardDetails = { ...initialState.cardDetails };
    },
  },
});

export const {
  setSelectedPlan,
  toggleAddon,
  setCardNumber,
  setExpiry,
  setCvc,
  resetSubscription,
} = subscriptionSlice.actions;

export default subscriptionSlice.reducer;
