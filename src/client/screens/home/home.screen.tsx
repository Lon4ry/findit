import RadialGradientBackgroundComponent from '../../components/radial-gradient-bg.component';
import HomeMobileLogo from './home-mobile-logo';
import HomeLogo from './home-logo';
import HomeHeader from './home-header';
import HomeDescription from './home-description';
import HomeStartButton from './home-start-button';
import HomeFooter from './home-footer';

export default function HomeScreen() {
  return (
    <>
      <RadialGradientBackgroundComponent />
      <HomeMobileLogo />
      <main>
        <HomeLogo />
        <div className={'fixed w-full md:w-1/3 md:left-[10vw] md:top-[10vh]'}>
          <div
            className={
              'mt-[16vh] md:mt-0 mx-auto w-2/3 flex flex-col justify-center'
            }
          >
            <HomeHeader />
            <HomeDescription />
            <HomeStartButton />
          </div>
        </div>
      </main>
      <HomeFooter />
    </>
  );
}
