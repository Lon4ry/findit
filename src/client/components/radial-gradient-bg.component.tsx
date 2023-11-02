'use client';
import { Fragment, useState } from 'react';
import styles from './radial-gradient-bg.module.scss';
import { Transition } from '@headlessui/react';

export default function RadialGradientBg() {
  const [show, setShow] = useState(true);
  const gradientOpacityAnimation = {
    from: 'opacity-[30%]',
    to: 'opacity-[60%]',
  };
  return (
    <Transition
      as={Fragment}
      appear={true}
      unmount={false}
      show={show}
      enter="transform transition-opacity ease-in-out duration-[1500ms]"
      enterFrom={gradientOpacityAnimation.from}
      enterTo={gradientOpacityAnimation.to}
      leave="transform transition-opacity ease-in-out duration-[1000ms]"
      leaveFrom={gradientOpacityAnimation.to}
      leaveTo={gradientOpacityAnimation.from}
      afterEnter={() => setShow(false)}
      afterLeave={() => setShow(true)}
    >
      <div className={`fixed w-full h-full ${styles.bgRadial}`} />
    </Transition>
  );
}
