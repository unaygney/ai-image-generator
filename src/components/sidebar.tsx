"use client";
import Link from "next/link";
import React from "react";
import { Logo, SignIn } from "./icons";
import { NAV_LINKS, NavLink } from "@/app/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Route } from "next";

export default function Sidebar() {
  return (
    <div className="w-[72px] hidden border-r border-[#212936] bg-[#121826] md:flex min-h-screen  items-center flex-col py-6">
      <Link href={"/"}>
        <Logo />
      </Link>

      <div className="flex flex-col gap-4 mt-[53px]">
        {NAV_LINKS.map((link: NavLink) => (
          <NavItem
            key={link.id}
            href={link.href}
            label={link.label}
            icon={link.icon}
          />
        ))}
      </div>

      <div className="mt-auto mb-4">
        <button className="size-10 rounded-lg bg-[#212936] inline-flex items-center justify-center">
          <SignIn />
        </button>
      </div>
    </div>
  );
}

function NavItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  console.log(label);
  return (
    <Link
      className={cn(
        "inline-flex  text-sm font-medium tracking-[-0.49px] text-[#e4e4e7] p-[9px] gap-3  items-center rounded-lg",
        {
          "bg-[#7c71ff] ": isActive,
        }
      )}
      href={href as Route}
    >
      {icon}
    </Link>
  );
}
