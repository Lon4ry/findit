'use client';
import RadialGradientBg from '../../../components/radial-gradient-bg.component';
import LogoMobileComponent from '../../../components/logo-mobile.component';
import LogoFullscreenComponent from '../../../components/logo-fullscreen.component';
import LoginContent from './login-content';

export default function LoginScreen() {
  return (
    <>
      <RadialGradientBg />
      <LogoMobileComponent />
      <LogoFullscreenComponent />
      <main className={'fixed w-full h-full'}>
        <LoginContent />
      </main>
    </>
  );
}
