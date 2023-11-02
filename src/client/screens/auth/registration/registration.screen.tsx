'use client';
import CreateProfileIntroduce from './create-profile/create-profile-introduce';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import CreateProfileWarning from './create-profile/create-profile-warning';
import CreateProfileUsername from './create-profile/create-profile-username';

export default function RegistrationScreen() {
  const [show, setShow] = useState(true);
  const [step, setStep] = useState(0);
  const router = useRouter();
  return (
    <Transition
      as={Fragment}
      show={show}
      appear={true}
      enter="transition ease-in-out duration-[450ms] transform-gpu"
      enterFrom={'opacity-0 backdrop-blur'}
      enterTo={'opacity-100 filter-none'}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'opacity-100 filter-none'}
      leaveTo={'opacity-0 backdrop-blur'}
      afterLeave={() => router.replace('/auth/login')}
    >
      <div className={'fixed w-full h-full bg-white'}>
        <div className={'w-full h-full flex justify-center items-center'}>
          <CreateProfileWarning step={step} />
          <CreateProfileIntroduce
            step={step}
            nextStep={() => setStep(1)}
            backButtonAction={() => setShow(false)}
          />
          <CreateProfileUsername step={step} nextStep={() => setStep(2)} />
        </div>
      </div>
    </Transition>
  );
}
