import Image from 'next/image';

export default function LogoComponent() {
  return (
    <Image
      className={'w-full'}
      src={'/logo.svg'}
      alt={'Find IT'}
      width={1}
      height={1}
    />
  );
}
