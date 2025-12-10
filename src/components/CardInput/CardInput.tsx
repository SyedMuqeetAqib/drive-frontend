import { useRef, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import {
  setCardNumber,
  setExpiry,
  setCvc,
} from "../../store/slices/subscriptionSlice";
import {
  MAX_CARD_DIGITS,
  MAX_EXPIRY_DIGITS,
  MAX_CVC_DIGITS,
  EXPIRY_MAX_LENGTH,
} from "../../constants/cardInputConstants";
import CardInputUI from "../../ui/CardInput/CardInput";

interface CardInputProps {
  onCardNumberChange?: (value: string) => void;
  onExpiryChange?: (value: string) => void;
  onCvcChange?: (value: string) => void;
}

// Formatting utility functions
const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  return digits.match(/.{1,4}/g)?.join(" ") || digits;
};

const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};

// Container Component with Logic
function CardInput({
  onCardNumberChange,
  onExpiryChange,
  onCvcChange,
}: CardInputProps) {
  const dispatch = useAppDispatch();
  const cardDetails = useAppSelector((state) => state.subscription.cardDetails);

  // Initialize local state from Redux using lazy initializers
  const [cardNumber, setCardNumberLocal] = useState(() =>
    cardDetails.cardNumber ? formatCardNumber(cardDetails.cardNumber) : ""
  );
  const [expiry, setExpiryLocal] = useState(() => cardDetails.expiry || "");
  const [cvc, setCvcLocal] = useState(() => cardDetails.cvc || "");

  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    const digitsOnly = formatted.replace(/\s/g, "");

    if (digitsOnly.length <= MAX_CARD_DIGITS) {
      setCardNumberLocal(formatted);
      dispatch(setCardNumber(digitsOnly));
      onCardNumberChange?.(digitsOnly);

      // Auto-focus expiry when card number is complete
      if (digitsOnly.length === MAX_CARD_DIGITS && expiryRef.current) {
        expiryRef.current.focus();
      }
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    const digitsOnly = formatted.replace(/\D/g, "");

    if (digitsOnly.length <= MAX_EXPIRY_DIGITS) {
      setExpiryLocal(formatted);
      dispatch(setExpiry(formatted));
      onExpiryChange?.(formatted);

      // Auto-focus CVC when expiry is complete
      if (formatted.length === EXPIRY_MAX_LENGTH && cvcRef.current) {
        cvcRef.current.focus();
      }
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= MAX_CVC_DIGITS) {
      setCvcLocal(digits);
      dispatch(setCvc(digits));
      onCvcChange?.(digits);
    }
  };

  return (
    <CardInputUI
      cardNumber={cardNumber}
      expiry={expiry}
      cvc={cvc}
      onCardNumberChange={handleCardNumberChange}
      onExpiryChange={handleExpiryChange}
      onCvcChange={handleCvcChange}
      expiryRef={expiryRef}
      cvcRef={cvcRef}
    />
  );
}

export default CardInput;
