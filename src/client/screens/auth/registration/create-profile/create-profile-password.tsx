import { CreateProfileProps } from './create-profile-props.type';
import { Fragment } from 'react';
import SplitInputTextComponent from '../../../../components/input-components/split-input-text.component';
import { Transition } from '@headlessui/react';

export default function CreateProfilePassword({
  step,
  nextStep,
  error,
  register,
  isTouched,
  isSubmitting,
}: CreateProfileProps) {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={step === 6}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={'flex flex-col gap-5 w-1/3'}>
        <h2 className={'font-bold text-4xl px-5 text-center'}>
          И последнее... твой пароль
        </h2>
        <SplitInputTextComponent
          isLast={true}
          name={'user.password'}
          type={'password'}
          isTouched={isTouched}
          isSubmitting={isSubmitting}
          register={register}
          error={error}
          handleClick={nextStep}
        />
      </div>
    </Transition>
  );
}
