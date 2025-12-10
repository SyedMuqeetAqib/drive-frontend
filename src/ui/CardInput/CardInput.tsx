import "./CardInput.scss";
import {
  MAX_CVC_DIGITS,
  CARD_NUMBER_MAX_LENGTH,
  EXPIRY_MAX_LENGTH,
} from "../../constants/cardInputConstants";

export interface CardInputUIProps {
  cardNumber: string;
  expiry: string;
  cvc: string;
  onCardNumberChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExpiryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCvcChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  expiryRef?: React.RefObject<HTMLInputElement | null>;
  cvcRef?: React.RefObject<HTMLInputElement | null>;
}

// Pure UI Component
function CardInputUI({
  cardNumber,
  expiry,
  cvc,
  onCardNumberChange,
  onExpiryChange,
  onCvcChange,
  expiryRef,
  cvcRef,
}: CardInputUIProps) {
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
          onChange={onCardNumberChange}
          maxLength={CARD_NUMBER_MAX_LENGTH}
        />
        <input
          ref={expiryRef}
          type="text"
          className="card-input expiry-input"
          placeholder="MM/YY"
          value={expiry}
          onChange={onExpiryChange}
          maxLength={EXPIRY_MAX_LENGTH}
        />
        <input
          ref={cvcRef}
          type="text"
          className="card-input cvc-input"
          placeholder="CVC"
          value={cvc}
          onChange={onCvcChange}
          maxLength={MAX_CVC_DIGITS}
        />
      </div>
    </div>
  );
}

export default CardInputUI;
