import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { CreateProfileProps } from './create-profile-props.type';

export default function CreateProfileIntroduce({
  step,
  nextStep,
  backButtonAction,
}: Omit<
  CreateProfileProps,
  'error' | 'register' | 'isTouched' | 'isSubmitting'
> & {
  backButtonAction?: () => void;
}) {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={step === 0}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={'flex flex-col gap-5'}>
        <h2 className={'font-bold text-4xl'}>Давай познакомимся</h2>
        <div className={'flex flex-col flex-nowrap gap-3'}>
          <button
            type={'button'}
            className={
              'w-full bg-blue-600 rounded p-2 text-white transition ease-in-out hover:bg-blue-700'
            }
            onClick={nextStep}
          >
            Продолжить
          </button>
          {backButtonAction ? (
            <button
              type={'button'}
              className={
                'rounded p-2 text-gray-500 transition bg-gray-100 ease-in-out hover:bg-gray-200'
              }
              onClick={() => backButtonAction()}
            >
              Назад
            </button>
          ) : null}
        </div>
      </div>
    </Transition>
  );
}
