type InputNumberComponentProps = {
  label?: string;
  min?: number;
  max?: number;
};

export default function InputNumberComponent({
  label,
  min,
  max,
}: InputNumberComponentProps) {
  return (
    <div className={'w-full flex flex-row gap-3 items-center justify-between'}>
      {label ? <label className={'text-xl font-light'}>{label}</label> : null}
      <input
        type={'number'}
        className={'border rounded border-gray-300 px-3 py-1.5 focus:outline-0'}
        min={min}
        max={max}
      />
    </div>
  );
}
