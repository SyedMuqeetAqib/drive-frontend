import "./AddonItem.scss";

interface AddonItemProps {
  id: string;
  name: string;
  disabled?: boolean;
  comingSoon?: boolean;
  checked?: boolean;
  onChange?: (id: string, checked: boolean) => void;
}

function AddonItem({
  id,
  name,
  disabled = false,
  comingSoon = false,
  checked = false,
  onChange,
}: AddonItemProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(id, e.target.checked);
    }
  };

  const className = [
    "addon-item",
    disabled && "addon-item-disabled",
    checked && "addon-item-selected",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      {comingSoon && <div className="coming-soon-badge">Coming soon</div>}
      <label htmlFor={id} className="addon-label">
        <span className="addon-name">{name}</span>
        <input
          type="checkbox"
          id={id}
          name="addons"
          value={id}
          className="addon-checkbox"
          disabled={disabled}
          checked={checked}
          onChange={handleChange}
        />
      </label>
    </div>
  );
}

export default AddonItem;
