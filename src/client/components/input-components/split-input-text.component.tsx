import ArrowIconComponent from '../svg/helpful-icons/arrow-icon.component';
import { ButtonProps } from './button-props.type';

type SplitInputComponentProps = {
  startText?: string;
} & ButtonProps;

export default function SplitInputTextComponent({
  startText,
  handleClick,
}: SplitInputComponentProps) {
  return (
    <div className={'flex flex-row flex-nowrap mx-5'}>
      <div className={'flex flex-row flex-nowrap w-full'}>
        {startText ? (
          <span
            className={
              'bg-gray-100 border border-r-0 border-gray-300 rounded-l p-3'
            }
          >
            {startText}
          </span>
        ) : null}
        <input
          type={'text'}
          className={`w-full border border-r-0 border-gray-300 p-3 focus:outline-0 ${
            startText ? 'border-l-0' : 'rounded-l'
          }`}
        />
      </div>
      <button
        className={
          'bg-blue-600 rounded-r px-3 hover:bg-blue-700 text-white transition ease-in-out'
        }
        onClick={handleClick}
      >
        <ArrowIconComponent />
      </button>
    </div>
  );
}
