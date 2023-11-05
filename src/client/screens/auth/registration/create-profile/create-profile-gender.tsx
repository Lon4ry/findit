import { CreateProfileProps } from './create-profile-props.type';
import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/outline';

export default function CreateProfileGender({
  step,
  nextStep,
}: CreateProfileProps) {
  const genders = [
    { id: 'Male', value: 'Парень' },
    { id: 'Female', value: 'Девушка' },
  ];
  const [selectedGender, setSelectedGender] = useState({
    id: null,
    value: null,
  });
  return (
    <Transition
      as={Fragment}
      appear={true}
      show={step === 4}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
    >
      <div className={'flex flex-col gap-10 w-1/3 items-center'}>
        <h2 className={'font-bold text-4xl px-5 text-center'}>
          Ты парень или девушка?
        </h2>
        <Listbox value={selectedGender} by={'id'} onChange={setSelectedGender}>
          <Listbox.Button className={'w-full border rounded p-3'}>
            <div
              className={
                'flex flex-row flex-nowrap justify-between items-center'
              }
            >
              <div>{selectedGender.value}</div>
              <div className={'w-8'}>
                <ChevronUpDownIcon className={'w-full'} />
              </div>
            </div>
          </Listbox.Button>
          <Transition
            as={Fragment}
            enter="transition ease-in-out duration-[250ms]"
            enterFrom={'opacity-0'}
            enterTo={'opacity-100'}
            leave="transition ease-in-out duration-[250ms]"
            leaveFrom={'opacity-100'}
            leaveTo={'opacity-0'}
          >
            <Listbox.Options
              className={'w-full border rounded absolute bg-white -bottom-3'}
            >
              {genders.map((gender) => (
                <Listbox.Option
                  key={gender.id}
                  value={gender}
                  className={({ selected, active }) =>
                    `flex flex-row flex-nowrap justify-between items-center px-3 py-2 cursor-pointer transition ease-in-out first:rounded-t last:rounded-b ${
                      selected
                        ? 'bg-blue-50'
                        : active
                        ? 'bg-amber-50'
                        : 'bg-white'
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <div>{gender.value}</div>
                      {selected ? (
                        <div className={'w-5'}>
                          <CheckIcon className={'w-full'} />
                        </div>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
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
