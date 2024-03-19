import Select from 'react-select';
import { InputProps } from '.';


export function SelectInput({ options, onChange }: InputProps) {
  if (!options) {
    throw new Error('Select input must have options');
  }

  return (
    <div className='w-56'>
      <Select
        className='basic-single'
        onChange={(e) => onChange(e?.value)}
        options={options}
        theme={theme => ({
          ...theme,
          borderRadius: 4,
          colors: {
            ...theme.colors,
            primary: '#1F2937',
            primary25: 'white',
          },
          spacing: {
            ...theme.spacing,
            baseUnit: 4
          }
        })}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: '#1F2937',
            color: 'white',
            opacity: 0.75
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? 'white' : '#1F2937',
            color: state.isFocused ? '#1F2937' : 'white',
          }),
          singleValue: (baseStyles, state) => ({
            ...baseStyles,
            color: 'white'
          })
        }}
      />
    </div>

  )
}
