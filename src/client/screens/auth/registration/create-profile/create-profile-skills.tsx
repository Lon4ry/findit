import { CreateProfileProps } from './create-profile-props.type';
import { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import InputNumberComponent from '../../../../components/input-components/input-number.component';
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';

export default function CreateProfileSkills({
  step,
  nextStep,
  register,
  errors,
  isSubmitting,
}: Omit<CreateProfileProps, 'error' | 'isTouched'> & {
  errors?: Merge<
    FieldError,
    FieldErrorsImpl<{
      Backend: number;
      Frontend: number;
      MachineLearning: number;
      DevOps: number;
      QA: number;
    }>
  >;
}) {
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
          Что насчет твоих навыков?
        </h2>
        <div className={'flex flex-col items-center gap-3 w-1/2'}>
          <InputNumberComponent
            defaultValue={0}
            label={'Frontend:'}
            min={0}
            max={10}
            name={'profile.skills.Frontend'}
            register={register}
            error={
              errors ? ('Frontend' in errors ? errors.Frontend : null) : null
            }
          />
          <InputNumberComponent
            defaultValue={0}
            label={'Backend:'}
            min={0}
            max={10}
            name={'profile.skills.Backend'}
            register={register}
            error={
              errors ? ('Backend' in errors ? errors.Backend : null) : null
            }
          />
          <InputNumberComponent
            defaultValue={0}
            label={'Machine Learning:'}
            min={0}
            max={10}
            name={'profile.skills.MachineLearning'}
            register={register}
            error={
              errors
                ? 'MachineLearning' in errors
                  ? errors.MachineLearning
                  : null
                : null
            }
          />
          <InputNumberComponent
            defaultValue={0}
            label={'DevOps:'}
            min={0}
            max={10}
            name={'profile.skills.DevOps'}
            register={register}
            error={errors ? ('DevOps' in errors ? errors.DevOps : null) : null}
          />
          <InputNumberComponent
            defaultValue={0}
            label={'QA:'}
            min={0}
            max={10}
            name={'profile.skills.QA'}
            register={register}
            error={errors ? ('QA' in errors ? errors.QA : null) : null}
          />
        </div>
        <button
          type={'button'}
          disabled={!!errors || isSubmitting}
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
