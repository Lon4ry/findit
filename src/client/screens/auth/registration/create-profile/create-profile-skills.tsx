import { CreateProfileProps } from './create-profile-props.type';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import InputNumberComponent from '../../../../components/input-components/input-number.component';

export default function CreateProfileSkills({
  step,
  nextStep,
}: CreateProfileProps) {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={step === 3}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={'flex flex-col gap-10 w-1/3 items-center'}>
        <h2 className={'font-bold text-4xl px-5 text-center'}>
          Что насчет твоих навыков?
        </h2>
        <div className={'flex flex-col items-center gap-3 w-1/2'}>
          <InputNumberComponent label={'Frontend:'} min={0} max={10} />
          <InputNumberComponent label={'Backend:'} min={0} max={10} />
          <InputNumberComponent label={'Machine Learning:'} min={0} max={10} />
          <InputNumberComponent label={'DevOps:'} min={0} max={10} />
          <InputNumberComponent label={'QA:'} min={0} max={10} />
        </div>
        <button
          className={
            'w-1/2 bg-blue-600 rounded p-2 text-white transition ease-in-out hover:bg-blue-700'
          }
          onClick={nextStep}
        >
          Продолжить
        </button>
      </div>
    </Transition>
  );
}
