import RadialGradientBackgroundComponent from '../../components/radial-gradient-bg.component';
import LogoMobileComponent from '../../components/logo-mobile.component';
import LogoFullscreenComponent from '../../components/logo-fullscreen.component';
import HomeContent from './home-content';

export default function HomeScreen() {
  return (
    <>
      <RadialGradientBackgroundComponent />
      <LogoMobileComponent />
      <LogoFullscreenComponent />
      <main className={'fixed w-full h-full'}>
        <HomeContent />
      </main>
    </>
  );
}
