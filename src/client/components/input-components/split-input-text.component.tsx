import ArrowIconComponent from '../svg/helpful-icons/arrow-icon.component';
import { ButtonProps } from './button-props.type';
import { FieldError } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

type SplitInputComponentProps = {
  startText?: string;
  name: string;
  register: (name: string, options?: any) => any;
  isTouched: boolean;
  error?: FieldError;
  type?: HTMLInputTypeAttribute;
  isLast?: boolean;
  isSubmitting?: boolean;
} & ButtonProps;

export default function SplitInputTextComponent({
  startText,
  handleClick,
  error,
  name,
  register,
  isTouched,
  type,
  isLast,
  isSubmitting,
}: SplitInputComponentProps) {
  return (
    <>
      <div className={'flex flex-row flex-nowrap mx-5'}>
        <div className={'flex flex-row flex-nowrap w-full'}>
          {startText ? (
            <span
              className={`bg-gray-100 border border-r-0 border-gray-300 rounded-l p-3 ${
                error ? 'border-red-600' : 'border-gray-300'
              }`}
            >
              {startText}
            </span>
          ) : null}
          <input
            {...register(name)}
            placeholder={''}
            name={name}
            type={type ? type : 'text'}
            className={`w-full border border-r-0 p-3 focus:outline-0 ${
              startText ? 'border-l-0' : 'rounded-l'
            } ${error ? 'border-red-600' : 'border-gray-300'}`}
            aria-invalid={!!error}
            required={true}
            formNoValidate={true}
          />
        </div>
        <button
          type={isLast ? 'submit' : 'button'}
          disabled={!isTouched || !!error || isSubmitting}
          className={`bg-blue-600 rounded-r px-3 hover:bg-blue-700 text-white transition ease-in-out disabled:bg-gray-500 ${
            error ? 'border-red-600' : ''
          }`}
          onClick={handleClick}
        >
          <ArrowIconComponent />
        </button>
      </div>
      <div className={'mx-5 absolute inset-y-full'}>
        {error ? (
          <span className={'text-red-500 bg-transparent'}>{error.message}</span>
        ) : null}
      </div>
    </>
  );
}
