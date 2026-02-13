import { Input } from '@/components/atoms/Input'

type Props = {
  label: string
  id: string
  placeholder?: string
  value?: string
  type?: string
  disabled?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function FormField({
  label,
  id,
  placeholder,
  value,
  type,
  disabled,
  onChange,
}: Props) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-white text-sm font-semibold">
        {label}
      </label>
      <Input
        id={id}
        placeholder={placeholder}
        value={value}
        type={type}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  )
}
