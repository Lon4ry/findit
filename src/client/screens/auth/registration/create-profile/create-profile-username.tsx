import { CreateProfileProps } from './create-profile.type';
import { Fragment } from 'react';
import Image from 'next/image';
import { Transition } from '@headlessui/react';

export default function CreateProfileUsername({
  step,
  nextStep,
}: CreateProfileProps) {
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={step === 1}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={'flex flex-col gap-3 w-1/3'}>
        <h2 className={'font-bold text-4xl px-5 text-center'}>
          Для начала, давайте определимся с публичным именем
        </h2>
        <div className={'flex flex-row flex-nowrap gap-1'}>
          <input
            type={'text'}
            className={'w-full border rounded border-gray-300 px-3'}
          />
          <button
            className={
              'bg-blue-600 rounded px-3 py-3 hover:bg-blue-700 text-white transition ease-in-out'
            }
            onClick={() => nextStep()}
          >
            <Image
              className={'w-full h-full'}
              src={'/helpful_icons/arrow_forward.svg'}
              alt={'Next'}
              width={1}
              height={1}
            />
          </button>
        </div>
      </div>
    </Transition>
  );
}
