import Image from "next/image";

export const Logo = () => (
  <Image
    src="/sharda-university-logo.png"
    alt="Sharda University"
    width={280}
    height={84}
    className="h-16 w-auto"
    priority
  />
);