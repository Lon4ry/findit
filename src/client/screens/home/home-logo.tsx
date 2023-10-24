import LogoComponent from '../../components/logo.component';

export default function HomeLogo() {
  return (
    <div className={'md:visible invisible fixed w-1/4 top-[8vh] right-[10vw]'}>
      <LogoComponent />
    </div>
  );
}
