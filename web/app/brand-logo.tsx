type BrandLogoProps = {
  size?: number;
  className?: string;
};

export default function BrandLogo({ size = 36, className }: BrandLogoProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      width={size}
      height={size}
      viewBox="0 0 128 128"
      fill="none"
    >
      <path
        d="M40 34 A30 30 0 1 0 40 94"
        stroke="#cbd5e1"
        strokeWidth="12"
        strokeLinecap="round"
      />
      <path
        d="M88 34 A30 30 0 1 0 88 94"
        stroke="#059669"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </svg>
  );
}
