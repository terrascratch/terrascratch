interface InputProps {
  label: string;
  placeholder?: string;
  onChange?: (value: string) => void;
}

export function Input({ label, placeholder, onChange }: InputProps) {
  return (
    <div className="flex flex-col items-start justify-center">
      <p>{label}</p>

      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => onChange && onChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
}
