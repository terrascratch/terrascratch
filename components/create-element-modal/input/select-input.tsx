import Select from 'react-select';

interface Option {
  label: string
  value: string
}

interface InputProps {
  options: Option[]
  onChange: (value: any) => void
}

export function SelectInput({ options, onChange }: InputProps) {
  return (
    <>
      <Select
        className='basic-single'
        onChange={(e) => onChange(e?.value)}
        defaultValue={options[0]}
        options={options}
      />
    </>
  )
}
