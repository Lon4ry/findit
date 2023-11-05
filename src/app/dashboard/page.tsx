'use client';
import CreateProfileGender from '../../client/screens/auth/registration/create-profile/create-profile-gender';

export default function DashboardPage() {
  return (
    <>
      <div className={'fixed w-full h-full bg-white'}>
        <div className={'w-full h-full flex justify-center items-center'}>
          <CreateProfileGender step={4} nextStep={() => {}} />
        </div>
      </div>
    </>
  );
}
