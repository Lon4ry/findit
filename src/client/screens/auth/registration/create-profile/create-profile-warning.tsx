import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { CreateProfileProps } from './create-profile-props.type';

type CreateProfileWarningProps = Omit<CreateProfileProps, 'nextStep'>;

export default function CreateProfileWarning({
  step,
}: CreateProfileWarningProps) {
  const [show, setShow] = useState(true);
  const opacity = {
    from: 'opacity-50',
    to: 'opacity-100',
  };
  return (
    <Transition
      as={Fragment}
      show={show}
      unmount={step !== 0}
      appear={true}
      enter="transition ease-in-out duration-[750ms]"
      enterFrom={opacity.from}
      enterTo={opacity.to}
      leave="transition ease-in-out duration-[750ms]"
      leaveFrom={opacity.to}
      leaveTo={step === 0 ? opacity.from : 'opacity-0'}
      afterEnter={() => setShow(false)}
      afterLeave={() => setShow(true)}
    >
      <div className={'fixed bottom-16 w-full'}>
        <div className={'flex justify-center'}>
          <h6 className={'p-3 text-black text-opacity-25 font-ibmPlexMono'}>
            Позже вы сможете отредактировать профиль
          </h6>
        </div>
      </div>
    </Transition>
  );
}
