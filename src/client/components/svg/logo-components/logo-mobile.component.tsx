import LogoSvgComponent from './logo-svg.component';

export default function LogoMobileComponent() {
  return (
    <header className={'visible md:invisible'}>
      <div className={'fixed w-full'}>
        <div className={'w-1/2 sm:w-1/3 mx-auto py-1'}>
          <LogoSvgComponent />
        </div>
      </div>
    </header>
  );
}
