'use client';
import CreateProfileIntroduce from './create-profile/create-profile-introduce';
import { Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import CreateProfileUsername from './create-profile/create-profile-username';
import CreateProfileName from './create-profile/create-profile-name';
import CreateProfileSkills from './create-profile/create-profile-skills';
import CreateProfileGender from './create-profile/create-profile-gender';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegistrationSchema, registrationSchema } from './registration.schema';
import CreateProfilePassword from './create-profile/create-profile-password';
import CreateProfileWarning from './create-profile/create-profile-warning';
import CreateProfileEmail from './create-profile/create-profile-email';
import { instanceToPlain } from 'class-transformer';

export default function RegistrationScreen() {
  const [show, setShow] = useState(true);
  const router = useRouter();

  const [step, setStep] = useState(0);

  const {
    setValue,
    register,
    formState: { touchedFields, isSubmitting, errors },
    handleSubmit,
  } = useForm<RegistrationSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationSchema> = async (
    data: RegistrationSchema,
  ): Promise<void> => {
    const [firstName, lastName] = data.profile.name.split(' ');
    const parsedData = instanceToPlain(data);
    parsedData.profile.name = { firstName: firstName, lastName: lastName };
    const response = await fetch('/auth/registration', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(parsedData),
    });
    console.log(response.status);
  };

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={'w-full h-full flex justify-center items-center'}
        >
          <CreateProfileIntroduce
            step={step}
            nextStep={() => setStep(1)}
            backButtonAction={() => setShow(false)}
          />
          <CreateProfileUsername
            isSubmitting={isSubmitting}
            register={register}
            isTouched={touchedFields.user ? touchedFields.user.username : false}
            error={errors.user ? errors.user.username : null}
            step={step}
            nextStep={() => setStep(2)}
          />

          <CreateProfileName
            isSubmitting={isSubmitting}
            register={register}
            isTouched={
              touchedFields.profile ? touchedFields.profile.name : false
            }
            error={errors.profile ? errors.profile.name : null}
            step={step}
            nextStep={() => setStep(3)}
          />
          <CreateProfileEmail
            isSubmitting={isSubmitting}
            register={register}
            isTouched={touchedFields.user ? touchedFields.user.email : false}
            error={errors.user ? errors.user.email : null}
            step={step}
            nextStep={() => setStep(4)}
          />
          <CreateProfileSkills
            isSubmitting={isSubmitting}
            register={register}
            errors={errors.profile ? errors.profile.skills : null}
            step={step}
            nextStep={() => setStep(5)}
          />
          <CreateProfileGender
            setValue={setValue}
            isSubmitting={isSubmitting}
            step={step}
            nextStep={() => setStep(6)}
          />
          <CreateProfilePassword
            register={register}
            isSubmitting={isSubmitting}
            isTouched={touchedFields.user ? touchedFields.user.password : false}
            error={errors.user ? errors.user.password : null}
            step={step}
            nextStep={() => setStep(-1)}
          />
        </form>
        <CreateProfileWarning
          text={'Позже вы сможете отредактировать свой профиль'}
          step={step}
          where={0}
        />
        <CreateProfileWarning
          text={'Имя пользователя не будет привязано к регистру'}
          step={step}
          where={1}
        />
        <CreateProfileWarning
          text={
            'Используйте настоящую почту, на него придет письмо с подтверждением'
          }
          step={step}
          where={3}
        />
        <CreateProfileWarning
          text={
            'Придумайте сложный пароль, во избежании попытки украсть ваш аккаунт'
          }
          step={step}
          where={6}
        />
      </div>
    </Transition>
  );
}
