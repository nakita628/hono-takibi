type Props = {
  id?: string | undefined
  placeholder?: string | undefined
  value?: string | undefined
  type?: string | undefined
  disabled?: boolean | undefined
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export function Input({ id, placeholder, value, type, disabled, onChange }: Props) {
  return (
    <input
      id={id}
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      type={type}
      className='
        w-full
        p-4
        text-lg
        bg-black
        border-2
        border-neutral-800
        rounded-md
        outline-none
        text-white
        focus:border-sky-500
        transition
        disabled:bg-neutral-900
        disabled:opacity-70
        disabled:cursor-not-allowed
      '
    />
  )
}
