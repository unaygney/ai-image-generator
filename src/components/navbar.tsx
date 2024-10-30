"use client";
import React, { useState } from "react";
import { Hamburger, Logo, SignIn, X } from "./icons";
import Link from "next/link";
import { motion } from "framer-motion";
import { NAV_LINKS, NavLink } from "@/app/constants";
import { Route } from "next";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="relative md:hidden w-full h-[72px] border-b border-[#212936] flex items-center justify-between px-6">
      <Link href="/">
        <Logo />
      </Link>
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-[#7c71ff] w-10 h-10 inline-flex items-center justify-center cursor-pointer transition-none duration-300 hover:opacity-90"
      >
        <Hamburger />
      </button>

      {menuOpen && (
        <motion.div
          onClick={toggleMenu}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black backdrop-blur-sm"
        />
      )}

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: menuOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed top-0 right-0 flex flex-col h-full w-[60%] max-w-[337px] py-6 px-8 bg-[#1c2230] shadow-lg"
      >
        <button
          onClick={toggleMenu}
          className="  p-2 rounded-lg bg-[#7c71ff] w-8 h-8 inline-flex items-center justify-center"
        >
          <X />
        </button>

        <div className="flex flex-col gap-4 mt-8">
          {NAV_LINKS.map((link: NavLink) => (
            <NavItem
              key={link.id}
              href={link.href}
              label={link.label}
              icon={link.icon}
            />
          ))}
        </div>

        <div className="mt-auto">
          <button className="w-full inline-flex  text-sm font-medium tracking-[-0.49px] text-[#e4e4e7] bg-[#212936] p-[9px] gap-3  items-center rounded-lg">
            <SignIn />
            <p className="font-medium">Sign In</p>
          </button>
        </div>
      </motion.div>
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
      <p className="font-medium">{label}</p>
    </Link>
  );
}
