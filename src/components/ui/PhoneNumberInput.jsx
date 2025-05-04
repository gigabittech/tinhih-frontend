import { useState, useEffect } from "react";
import countries_data from "../../data/countryData";

export function PhoneNumberInput({
  register,
  setValue,
  watch,
  errors,
  defaultCountry = "+880",
  label = "Phone number",
  placeholder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const initialCountry =
    countries_data.find((c) => c.code === defaultCountry) || countries_data[0];
  const [selectedCountry, setSelectedCountry] = useState(initialCountry);

  const phone = watch("phone");

  // sync hidden inputs whenever country or phone changes
  useEffect(() => {
    setValue("countryCode", selectedCountry.code);
    setValue("fullPhoneNumber", `${selectedCountry.code}${phone || ""}`);
  }, [selectedCountry, phone, setValue]);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="w-full">
      <label className="text-sm mb-1 block">{label}</label>
      <div className="flex border border-[#a0a0a0] rounded px-2 py-[6px] items-center focus-within:border-amber-300 relative">
        {/* Custom country dropdown */}
        <div className="relative w-28">
          <div
            onClick={toggleDropdown}
            className="cursor-pointer text-sm flex justify-between items-center"
          >
            {selectedCountry.abbreviation} {selectedCountry.code}
            <svg
              className="ml-1 h-4 w-4 inline-block"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M5.516 7.548L10 12.032l4.484-4.484L16 9.064l-6 6-6-6z" />
            </svg>
          </div>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-60 bg-white border border-gray-300 rounded shadow max-h-48 overflow-auto text-sm">
              {countries_data.map((country, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelect(country)}
                >
                  {country.abbreviation} {country.name} {country.code}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Phone input */}
        <input
          type="number"
          {...register("phone", {
            required: false,
            minLength: { value: 7, message: "Invalid phone number length" },
          })}
          className="ml-2 flex-1 outline-none text-sm"
          placeholder={placeholder}
        />
      </div>

      {/* Hidden form fields */}
      <input type="hidden" {...register("countryCode")} />
      <input type="hidden" {...register("fullPhoneNumber")} />

      {/* Error message */}
      {errors.phone && (
        <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
      )}
    </div>
  );
}
