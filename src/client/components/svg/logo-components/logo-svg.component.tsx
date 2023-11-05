import { SvgComponentProps } from '../svg-component-props.type';

export default function LogoSvgComponent({ className }: SvgComponentProps) {
  return (
    <svg
      width="474"
      height="155"
      viewBox="0 0 474 155"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full ${className}`}
    >
      <g filter="url(#filter0_d_61_273)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M273 88C273 97.9625 268.953 106.98 262.414 113.498L279 135L268.45 143.138L251.383 121.012C246.978 122.934 242.113 124 237 124C217.118 124 201 107.882 201 88C201 68.1177 217.118 52 237 52C256.882 52 273 68.1177 273 88ZM236 112C249.807 112 261 100.807 261 87C261 73.1929 249.807 62 236 62C222.193 62 211 73.1929 211 87C211 100.807 222.193 112 236 112Z"
          fill="black"
        />
        <path
          d="M6 124V30.9091H71.4545V51.2727H31.2727V67.2727H67.4545V87.6364H31.2727V124H6ZM81.1136 124V54.1818H106.205V124H81.1136ZM93.6591 46.9091C90.2652 46.9091 87.3561 45.7879 84.9318 43.5455C82.5076 41.303 81.2955 38.6061 81.2955 35.4545C81.2955 32.303 82.5076 29.6061 84.9318 27.3636C87.3561 25.1212 90.2652 24 93.6591 24C97.0833 24 99.9924 25.1212 102.386 27.3636C104.811 29.6061 106.023 32.303 106.023 35.4545C106.023 38.6061 104.811 41.303 102.386 43.5455C99.9924 45.7879 97.0833 46.9091 93.6591 46.9091ZM144.08 84.7273V124H118.989V54.1818H142.807V67.4545H143.534C145.049 63.0303 147.716 59.5606 151.534 57.0455C155.383 54.5303 159.867 53.2727 164.989 53.2727C169.928 53.2727 174.216 54.4091 177.852 56.6818C181.519 58.9242 184.352 62.0151 186.352 65.9545C188.383 69.8939 189.383 74.3939 189.352 79.4545V124H164.261V84.7273C164.292 81.2727 163.413 78.5606 161.625 76.5909C159.867 74.6212 157.413 73.6364 154.261 73.6364C152.201 73.6364 150.398 74.0909 148.852 75C147.337 75.8788 146.17 77.1515 145.352 78.8182C144.534 80.4545 144.11 82.4242 144.08 84.7273ZM379.648 30.9091V124H354.375V30.9091H379.648ZM389.08 51.2727V30.9091H469.989V51.2727H441.989V124H417.08V51.2727H389.08Z"
          fill="black"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_61_273"
          x="-4"
          y="0"
          width="482"
          height="163"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_61_273"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_61_273"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
}
