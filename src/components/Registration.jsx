import { useState } from "react";
import { BODY_TYPES, USER_ROLES, emptyFormState } from "../data/constants";
import guitarPhoto from "../assets/guitar-hero.jpg";


function validateField(name, value) {
  switch (name) {
    case "guitarModel":
      if (!value.trim()) return "Guitar model is required.";
      if (value.trim().length < 3) return "Must be at least 3 characters.";
      return "";
    case "bodyType":
      return value ? "" : "Select a body type.";
    case "brandName":
      return value.trim() ? "" : "Brand name is required.";
    case "stockQuantity": {
      if (value === "") return "Stock quantity is required.";
      const num = Number(value);
      if (Number.isNaN(num)) return "Must be a number.";
      if (num < 1 || num > 100) return "Must be between 1 and 100.";
      return "";
    }
    case "manufacturerName":
      return value.trim() ? "" : "Manufacturer name is required.";
    case "userRole":
      return value ? "" : "Select a user role.";
    default:
      return "";
  }
}

export default function Registration({ onAddItem }) {
  const [formData, setFormData] = useState(emptyFormState);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nextErrors = Object.keys(formData).reduce((acc, key) => {
      acc[key] = validateField(key, formData[key]);
      return acc;
    }, {});
    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    onAddItem({
      id: crypto.randomUUID(),
      ...formData,
      stockQuantity: Number(formData.stockQuantity),
    });

    setFormData(emptyFormState);
    setErrors({});
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2000);
  }

  const inputClass = (field) =>
    `w-full border bg-white px-3 py-2 font-body text-sm text-ink outline-none transition focus:border-crimson ${
      errors[field] ? "border-crimson-deep" : "border-ink/20"
    }`;

  return (
    <div className="border border-ink/15 bg-white">
      <div className="flex items-center justify-between border-b border-ink/15 bg-ink px-5 py-3">
        <h2 className="font-display text-lg uppercase tracking-wide text-paper">
          Register New Guitar
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-[1fr_120px]">
        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-wide text-ink/60">
              Guitar Model
            </label>
            <input
              type="text"
              name="guitarModel"
              value={formData.guitarModel}
              onChange={handleChange}
              placeholder="e.g. Stratocaster Player II"
              className={inputClass("guitarModel")}
            />
            {errors.guitarModel && (
              <p className="mt-1 text-xs text-crimson-deep">{errors.guitarModel}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wide text-ink/60">
                Body Type
              </label>
              <select
                name="bodyType"
                value={formData.bodyType}
                onChange={handleChange}
                className={inputClass("bodyType")}
              >
                <option value="">Select...</option>
                {BODY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {errors.bodyType && (
                <p className="mt-1 text-xs text-crimson-deep">{errors.bodyType}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wide text-ink/60">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stockQuantity"
                value={formData.stockQuantity}
                onChange={handleChange}
                placeholder="1-100"
                className={inputClass("stockQuantity")}
              />
              {errors.stockQuantity && (
                <p className="mt-1 text-xs text-crimson-deep">{errors.stockQuantity}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wide text-ink/60">
                Brand Name
              </label>
              <input
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="e.g. Fender"
                className={inputClass("brandName")}
              />
              {errors.brandName && (
                <p className="mt-1 text-xs text-crimson-deep">{errors.brandName}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-mono text-xs uppercase tracking-wide text-ink/60">
                Manufacturer Name
              </label>
              <input
                type="text"
                name="manufacturerName"
                value={formData.manufacturerName}
                onChange={handleChange}
                placeholder="e.g. Fender Musical Instruments"
                className={inputClass("manufacturerName")}
              />
              {errors.manufacturerName && (
                <p className="mt-1 text-xs text-crimson-deep">{errors.manufacturerName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="mb-1 block font-mono text-xs uppercase tracking-wide text-ink/60">
              User Role
            </label>
            <div className="flex gap-5">
              {USER_ROLES.map((role) => (
                <label key={role} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="userRole"
                    value={role}
                    checked={formData.userRole === role}
                    onChange={handleChange}
                    className="h-4 w-4 accent-crimson"
                  />
                  {role}
                </label>
              ))}
            </div>
            {errors.userRole && (
              <p className="mt-1 text-xs text-crimson-deep">{errors.userRole}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-crimson px-4 py-2.5 font-display uppercase tracking-wide text-white transition hover:bg-crimson-deep"
          >
            {submitted ? "Added ✓" : "Add to Registry"}
          </button>
        </div>

        <img
          src={guitarPhoto}
          alt="Featured guitar"
          className="h-32 w-full object-cover sm:h-full"
        />
      </form>
    </div>
  );
}
