'use client';
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import LoginWithButton from './login-with-button';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginContent() {
  const [show, setShow] = useState(true);
  const [showRegistration, switchToRegistration] = useState(false);
  const [url, setUrl] = useState('');
  const router = useRouter();

  const urls = [
    '/auth/oauth/apple-auth',
    '/auth/oauth/google-auth',
    '/auth/oauth/yandex-auth',
    '/auth/oauth/github-auth',
  ];

  const push = (href: string) => {
    setUrl(href);
    setShow(false);
  };

  return (
    <Transition
      as={Fragment}
      show={show}
      appear={true}
      enter="transition ease-in-out duration-[450ms]"
      enterFrom={'translate-x-[300%] blur'}
      enterTo={'translate-x-0 filter-none'}
      leave="transition ease-in-out duration-[450ms]"
      leaveFrom={'translate-x-0 filter-none'}
      leaveTo={'-translate-x-[300%] blur'}
      afterLeave={() => router.push(url)}
    >
      <div
        className={
          'flex flex-row w-full h-full items-center md:justify-between justify-center'
        }
      >
        <Transition
          as={Fragment}
          show={showRegistration}
          enter="transition-opacity ease-in-out duration-[450ms] transform-gpu bg-white"
          enterFrom={'opacity-0 filter-none'}
          enterTo={'opacity-100 backdrop-blur'}
          afterEnter={() => router.push('/auth/registration')}
        >
          <div className={'z-50 fixed w-full h-full'} />
        </Transition>
        <div
          className={
            'w-2/3 md:w-1/3 bg-white rounded-xl border shadow-xl md:mx-20'
          }
        >
          <div className={'w-full flex flex-col py-16 gap-6 items-center'}>
            <div className={'flex flex-col gap-3'}>
              <h1 className={'text-center text-xl'}>Войдите с помощью</h1>
              <div className={'flex flex-row flex-wrap justify-center gap-3'}>
                <div className={'hidden'}>
                  {urls.map((u) => (
                    <Link key={u} href={u} />
                  ))}
                </div>
                <LoginWithButton
                  src={'/icons/auth/apple.svg'}
                  alt={'Apple'}
                  action={() => push('/auth/oauth/apple-auth')}
                />
                <LoginWithButton
                  src={'/icons/auth/google.svg'}
                  alt={'Google'}
                  action={() => push('/auth/oauth/google-auth')}
                />
                <LoginWithButton
                  src={'/icons/auth/yandex.svg'}
                  alt={'Яндекс'}
                  action={() => push('/auth/oauth/yandex-auth')}
                />
                <LoginWithButton
                  src={'/icons/auth/github.svg'}
                  alt={'Github'}
                  action={() => push('/auth/oauth/github-auth')}
                />
              </div>
            </div>
            <div className="inline-flex items-center justify-center w-full">
              <hr className="w-2/3 h-px my-4 bg-gray-400 border-0" />
              <span className="absolute px-2 text-gray-900 bg-white">или</span>
            </div>
            <div className={'w-full flex flex-col items-center px-20 gap-5'}>
              <div className={'w-full'}>
                <input
                  type={'text'}
                  className={'w-full rounded border border-gray-400 py-1 px-2'}
                />
              </div>
              <div className={'w-full'}>
                <input
                  type={'password'}
                  className={'w-full rounded border border-gray-400 py-1 px-2'}
                />
              </div>
              <div className={'w-full flex flex-row-reverse gap-2'}>
                <button
                  className={
                    'rounded bg-blue-600 text-white py-2 w-full hover:bg-blue-700 transition ease-in-out'
                  }
                >
                  Продолжить
                </button>
                <button
                  className={
                    'rounded text-gray-500 bg-gray-100 py-2 w-full hover:bg-gray-200 transition ease-in-out'
                  }
                  onClick={() => switchToRegistration(true)}
                >
                  Регистрация
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  );
}
