import Image from "next/image";

type BrandLogoProps = {
  size?: number;
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({
  size = 48,
  className,
  priority = false,
}: BrandLogoProps) {
  return (
    <Image
      alt=""
      aria-hidden="true"
      className={className}
      height={size}
      priority={priority}
      src="/carboncam-logo.png"
      style={{ display: "block", height: size, objectFit: "contain", width: size }}
      width={size}
    />
  );
}
