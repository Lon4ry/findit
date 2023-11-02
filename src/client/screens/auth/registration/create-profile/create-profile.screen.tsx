'use client';
import CreateProfileIntroduce from './create-profile-introduce';
import { useState } from 'react';
import CreateProfileName from './create-profile-name';
import CreateProfileWarning from './create-profile-warning';

export default function CreateProfileScreen() {
  const [step, setStep] = useState(0);
  return (
    <>
      <div className={'fixed w-full h-full bg-white'}>
        <div className={'w-full h-full flex justify-center items-center'}>
          <CreateProfileIntroduce
            step={step}
            nextStep={() => {
              setShow(true);
              setStep(1);
            }}
          />
          <CreateProfileName step={step} nextStep={() => setStep(2)} />
          {/*<CreateProfileGender*/}
          {/*  step={step}*/}
          {/*  nextStep={(s: number) => setStep(s)}*/}
          {/*/>*/}
        </div>
      </div>
      <CreateProfileWarning step={step} />
    </>
  );
}
