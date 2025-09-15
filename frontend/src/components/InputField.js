import { useState } from "react";

export default function InputField({ 
  type = 'text', 
  placeholder = '', 
  value, 
  label,
  onChange, 
  className = '', 
  ...props 
}) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div className={`flex flex-col text-[13px] tracking-wide w-full px-4 py-2 border-2 border-gray-100 rounded-xl transition-all duration-200 ${value && 'bg-[var(--galaxy)]/4 border-transparent'}`}>
    <input
      type={type}
      placeholder={value || placeholder}
      value={value}
      onChange={onChange}
      className={`outline-none py-1.5 text-sm font-semibold placeholder:font-medium text-[var(--galaxy)] ${className}`}
      {...props}
      onFocus={() => setIsFocused(!isFocused)}
    />
    </div>
  );
}