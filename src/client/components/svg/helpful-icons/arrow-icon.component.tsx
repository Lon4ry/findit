import { SvgComponentProps } from '../svg-component-props.type';

export default function ArrowIconComponent({ className }: SvgComponentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24"
      viewBox="0 -960 960 960"
      width="24"
      fill="white"
      className={`w-full h-full ${className}`}
    >
      <path d="M647-440H160v-80h487L423-744l57-56 320 320-320 320-57-56 224-224Z" />
    </svg>
  );
}
