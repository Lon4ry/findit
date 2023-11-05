import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';

type CreateProfileWarningProps = { text: string; step: number; where: number };

export default function CreateProfileWarning({
  text,
  step,
  where,
}: CreateProfileWarningProps) {
  const [show, setShow] = useState(step === where);
  const opacity = {
    from: 'opacity-50',
    to: 'opacity-100',
  };
  return (
    <Transition
      as={Fragment}
      show={show}
      unmount={where < step || step === -1}
      appear={step === where}
      enter="transition ease-in-out duration-[750ms]"
      enterFrom={opacity.from}
      enterTo={opacity.to}
      leave="transition ease-in-out duration-[750ms]"
      leaveFrom={opacity.to}
      leaveTo={step === where ? opacity.from : 'opacity-0'}
      afterEnter={() => setShow(false)}
      afterLeave={() => setShow(true)}
    >
      <div className={'fixed bottom-16 w-full'}>
        <div className={'flex justify-center'}>
          <h6
            className={
              'p-3 text-black text-center text-opacity-25 font-ibmPlexMono'
            }
          >
            {text}
          </h6>
        </div>
      </div>
    </Transition>
  );
}
