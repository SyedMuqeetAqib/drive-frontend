import { useRef, useState } from "react";
import "./CardInput.scss";

interface CardInputProps {
  onCardNumberChange?: (value: string) => void;
  onExpiryChange?: (value: string) => void;
  onCvcChange?: (value: string) => void;
}

const MAX_CARD_DIGITS = 16;
const MAX_EXPIRY_DIGITS = 4;
const MAX_CVC_DIGITS = 3;
const CARD_NUMBER_MAX_LENGTH = 19; // 16 digits + 3 spaces
const EXPIRY_MAX_LENGTH = 5; // MM/YY format

function CardInput({
  onCardNumberChange,
  onExpiryChange,
  onCvcChange,
}: CardInputProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const expiryRef = useRef<HTMLInputElement>(null);
  const cvcRef = useRef<HTMLInputElement>(null);

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

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    const digitsOnly = formatted.replace(/\s/g, "");

    if (digitsOnly.length <= MAX_CARD_DIGITS) {
      setCardNumber(formatted);
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
      setExpiry(formatted);
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
      setCvc(digits);
      onCvcChange?.(digits);
    }
  };

  return (
    <div className="card-input-container">
      <div className="card-icon-wrapper">
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
          <path d="M2 10H22" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>
      <div className="card-inputs-wrapper">
        <input
          type="text"
          className="card-input card-number-input"
          placeholder="1234 5678 1234 5678"
          value={cardNumber}
          onChange={handleCardNumberChange}
          maxLength={CARD_NUMBER_MAX_LENGTH}
        />
        <input
          ref={expiryRef}
          type="text"
          className="card-input expiry-input"
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          maxLength={EXPIRY_MAX_LENGTH}
        />
        <input
          ref={cvcRef}
          type="text"
          className="card-input cvc-input"
          placeholder="CVC"
          value={cvc}
          onChange={handleCvcChange}
          maxLength={MAX_CVC_DIGITS}
        />
      </div>
    </div>
  );
}

export default CardInput;
