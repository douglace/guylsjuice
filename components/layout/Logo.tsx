import Image from "next/image";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <Image
      src="/logo.webp"
      alt="Guyl's Juice"
      width={140}
      height={50}
      className={className}
      priority
    />
  );
}
