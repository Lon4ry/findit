import { Transition } from '@headlessui/react';
import { Fragment } from 'react';
import SplitInputTextComponent from '../../../../components/input-components/split-input-text.component';

type CreateProfileNameProps = {
  step: number;
  nextStep: () => void;
};
export default function CreateProfileName({
  step,
  nextStep,
}: CreateProfileNameProps) {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={step === 2}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={'flex flex-col gap-5 w-1/3'}>
        <h2 className={'font-bold text-4xl px-5 text-center'}>
          А что насчет настоящего имени?
        </h2>
        <SplitInputTextComponent handleClick={nextStep} />
      </div>
    </Transition>
  );
}
