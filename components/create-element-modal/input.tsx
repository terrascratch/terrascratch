interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function Input({ label, placeholder, value, onChange }: InputProps) {
  return (
    <div className="flex flex-col items-center justify-start">
      <p>{label}</p>

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
