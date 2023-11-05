import { ButtonProps } from '../../components/input-components/button-props.type';
import { useRouter } from 'next/navigation';

export default function HomeStartButton({ handleClick }: ButtonProps) {
  const router = useRouter();
  return (
    <div className={'md:mx-0 flex flex-col gap-1 md:items-start '}>
      <button
        onClick={() => handleClick()}
        className={
          'w-full rounded-xl text-white text-sm sm:text-md md:text-lg px-5 py-2 bg-[#8417F9] hover:bg-indigo-800 transition ease-in-out'
        }
      >
        Начать
      </button>
      <button
        className={'md:text-left'}
        onClick={() => router.push('/help/faq')}
      >
        Нужна помощь? <span className={'text-green-500'}>Посмотрите FAQ</span>
      </button>
    </div>
  );
}
