import { FieldError } from 'react-hook-form';

export type CreateProfileProps = {
  step: number;
  nextStep: (...args: any[]) => void;
  register?: (name: string) => any;
  error?: FieldError;
  isTouched: boolean;
  isSubmitting?: boolean;
};
