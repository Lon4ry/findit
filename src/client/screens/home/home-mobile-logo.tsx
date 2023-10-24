import LogoComponent from '../../components/logo.component';

export default function HomeMobileLogo() {
  return (
    <header className={'visible md:invisible'}>
      <div className={'fixed w-full'}>
        <div className={'w-1/2 sm:w-1/3 mx-auto py-1'}>
          <LogoComponent />
        </div>
      </div>
    </header>
  );
}
