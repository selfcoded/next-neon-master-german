"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  label?: string;
  iconSrc: string;
  href: string;
};

const SidebarItem = ({ label, iconSrc, href }: Props) => {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Button
      className="justify-start"
      variant={active ? "default" : "outline"}
      asChild
    >
      <Link href={href}>
        <Image
          className="mr-2"
          width={10}
          height={10}
          src={iconSrc}
          alt={href}
        />
        {label}
      </Link>
    </Button>
  );
};

export default SidebarItem;
