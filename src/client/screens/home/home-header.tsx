export default function HomeHeader() {
  return (
    <header>
      <h1
        className={
          'text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-ibmPlexMono tracking-wider'
        }
      >
        <span
          className={
            'text-xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-indigo-700 font-bold'
          }
        >
          Find IT
        </span>{' '}
        — первое кроссплатформенное приложение для{' '}
        <span className={'font-semibold text-indigo-950'}>
          предпринимателей
        </span>
      </h1>
    </header>
  );
}
