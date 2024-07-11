"use client";

import Image from "next/image";
import { ModeToggle } from "./theme-changer";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useMediaQuery } from "./use-media-query";
import { AlignJustifyIcon } from "lucide-react";

const Links = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Join IT CLUB",
    href: "/join",
  },
  {
    title: "Cek Khodam",
    href: "/cek-khodam",
  },
  {
    title: "Social Media",
    href: "https://terr48yte.github.io",
  },
];

export function Navbar() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  return (
    <header className="fixed m-auto w-full">
      <div className="flex justify-between p-4">
        <Link href={"/"}>
          <Image
            src="/header.svg"
            alt=""
            width={120}
            height={120}
            className="dark:invert"
          />
        </Link>
        {isDesktop && (
          <NavigationMenu>
            <NavigationMenuList>
              {Links.map((item, i) => (
                <Link href={item.href} legacyBehavior passHref key={i}>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        )}
        <div className="flex gap-2">
          {!isDesktop && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <AlignJustifyIcon />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                  {Links.map((item, i) => (
                    <Link href={item.href} key={i}>
                      {item.title}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
