'use client';
import RegistrationScreen from '../../../client/screens/auth/registration/registration.screen';
import { useSearchParams } from 'next/navigation';
import { RegistrationSchema } from '../../../client/screens/auth/registration/registration.schema';

export default function RegistrationPage() {
  const searchParams = useSearchParams();
  const data = JSON.parse(searchParams.get('data'));
  !!data
    ? data.profile.name
      ? (data.profile.name = Object.values(data.profile.name).join(' '))
      : null
    : null;
  !!data
    ? !!data.profile.gender
      ? (data.profile.gender =
          data.profile.gender[0].toUpperCase() + data.profile.gender.slice(1))
      : null
    : null;
  const parsedData: RegistrationSchema = data;
  return <RegistrationScreen defaultValues={parsedData} />;
}
