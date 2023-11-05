import { FieldError } from 'react-hook-form';

type InputNumberComponentProps = {
  defaultValue?: number;
  label?: string;
  min?: number;
  max?: number;
  name: string;
  error?: FieldError;
  register: (name: string, options?: any) => any;
};

export default function InputNumberComponent({
  defaultValue,
  label,
  min,
  max,
  name,
  register,
  error,
}: InputNumberComponentProps) {
  return (
    <div className={'w-full flex flex-row gap-3 items-center justify-between'}>
      {label ? <label className={'text-xl font-light'}>{label}</label> : null}
      <input
        {...register(name, {
          setValueAs: (value: string) => Number(value),
        })}
        name={name}
        defaultValue={defaultValue}
        type={'number'}
        className={'border rounded border-gray-300 px-3 py-1.5 focus:outline-0'}
        min={min}
        max={max}
        aria-invalid={!!error}
      />
    </div>
  );
}
