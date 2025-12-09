import { useRef, useState } from "react";
import "./CardInput.scss";

interface CardInputProps {
  onCardNumberChange?: (value: string) => void;
  onExpiryChange?: (value: string) => void;
  onCvcChange?: (value: string) => void;
}

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

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add spaces every 4 digits
    return digits.match(/.{1,4}/g)?.join(" ") || digits;
  };

  const formatExpiry = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, "");
    // Add slash after 2 digits
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    if (formatted.replace(/\s/g, "").length <= 16) {
      setCardNumber(formatted);
      if (onCardNumberChange) {
        onCardNumberChange(formatted.replace(/\s/g, ""));
      }
      // Auto-forward to expiry when card number is complete (16 digits)
      if (formatted.replace(/\s/g, "").length === 16 && expiryRef.current) {
        expiryRef.current.focus();
      }
    }
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiry(e.target.value);
    if (formatted.replace(/\D/g, "").length <= 4) {
      setExpiry(formatted);
      if (onExpiryChange) {
        onExpiryChange(formatted);
      }
      // Auto-forward to CVC when expiry is complete (MM/YY format)
      if (formatted.length === 5 && cvcRef.current) {
        cvcRef.current.focus();
      }
    }
  };

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    if (digits.length <= 3) {
      setCvc(digits);
      if (onCvcChange) {
        onCvcChange(digits);
      }
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
          maxLength={19} // 16 digits + 3 spaces
        />
        <input
          ref={expiryRef}
          type="text"
          className="card-input expiry-input"
          placeholder="MM/YY"
          value={expiry}
          onChange={handleExpiryChange}
          maxLength={5}
        />
        <input
          ref={cvcRef}
          type="text"
          className="card-input cvc-input"
          placeholder="CVC"
          value={cvc}
          onChange={handleCvcChange}
          maxLength={3}
        />
      </div>
    </div>
  );
}

export default CardInput;

