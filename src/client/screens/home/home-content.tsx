'use client';
import HomeHeader from './home-header';
import HomeDescription from './home-description';
import HomeStartButton from './home-start-button';
import { useRouter } from 'next/navigation';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

export default function HomeContent() {
  const router = useRouter();
  const [show, setShow] = useState(true);
  return (
    <Transition
      as={Fragment}
      show={show}
      leave="transition ease-in-out duration-[450ms] transform-gpu"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] backdrop-blur'}
      afterLeave={() => router.push('/auth/login')}
    >
      <div
        className={
          'flex flex-row w-full h-full items-center md:justify-between justify-center md:mx-20'
        }
      >
        <div className={'md:w-1/4 w-2/3'}>
          <div className={'w-full flex flex-col gap-20'}>
            <HomeHeader />
            <HomeDescription />
            <HomeStartButton handleClick={() => setShow(false)} />
          </div>
        </div>
      </div>
    </Transition>
  );
}
