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
    if (onChange && !disabled) {
      onChange(id, e.target.checked);
    }
  };

  return (
    <div
      className={`addon-item ${disabled ? "addon-item-disabled" : ""} ${
        checked ? "addon-item-selected" : ""
      }`}
    >
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
