import Image from "next/image";

export const Logo = () => (
  <Image
    src="/sharda-university-logo.png"
    alt="Sharda University"
    width={200}
    height={60}
    className="h-12 w-auto"
    priority
  />
);