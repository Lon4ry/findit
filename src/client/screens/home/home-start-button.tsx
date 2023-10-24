'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function HomeStartButton() {
  const router = useRouter();
  return (
    <div className={'mt-20 mx-auto md:mx-0 flex flex-col gap-1'}>
      <button
        onClick={() => router.push('/auth')}
        className={
          'rounded-xl text-white text-sm sm:text-md md:text-lg px-5 py-2 bg-[#8417F9] hover:bg-indigo-800 transition ease-in-out'
        }
      >
        Начать
      </button>
      <Link href={'/help/faq'}>
        Нужна помощь? <span className={'text-green-500'}>Посмотрите FAQ</span>
      </Link>
    </div>
  );
}
