import LogoComponent from './logo.component';

export default function LogoFullscreenComponent() {
  return (
    <header className={'md:visible invisible'}>
      <div className={'fixed w-1/4 top-[8vh] right-[10vw]'}>
        <LogoComponent />
      </div>
    </header>
  );
}
