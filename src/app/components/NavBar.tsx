"use client";

import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/react";

import {
  ChartColumnBig,
  CircleHelp,
  SunDim
} from "lucide-react";

import { useTheme } from "@/utils/hooks/useTheme";

const NavBar = () => {

  const { changeTheme } = useTheme('dark');

  return (
   <Navbar disableAnimation isBordered maxWidth="full" height={`6rem`}>
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="start">
        <NavbarBrand>
          <Link
            href="/"
            className="text-5xl font-serif font-medium select-none cursor-pointer hover:text-secondary transition-all"
          >
            Craftle
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarBrand>
          <Link
            href="/"
            className="text-5xl font-serif font-medium select-none cursor-pointer hover:text-secondary transition-all"
          >
            Craftle
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Button
            className="p-2 text-secondary hover:text-primary transition-all"
            size="lg"
            variant="light"
            isIconOnly
          >
            <ChartColumnBig
              size={40}
            />
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            className="p-2 text-secondary hover:text-primary transition-all"
            size="lg"
            variant="light"
            isIconOnly
          >
            <CircleHelp
              size={40}
            />
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Button
            className="p-2 text-secondary hover:text-primary transition-all"
            size="lg"
            variant="light"
            isIconOnly
            onClick={() => changeTheme()}
          >
            <SunDim
              size={40}
            />
          </Button>
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          <Button
            radius="full"
            className="border-primary hover:bg-primary hover:text-black transition-all"
            size="lg"
            variant="bordered"
            href="/signin"
            as={Link}
          >
            Subscribe
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <section className="flex flex-col items-center justify-center gap-8 h-svh">
          <NavbarMenuItem>
            <Button
              size="lg"
              variant="light"
            >
              Leaderboards
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>
            <Button
              radius="full"
              className="border-primary hover:bg-primary hover:text-black transition-all"
              size="lg"
              variant="bordered"
              href="/signin"
              as={Link}
            >
              Subscribe
            </Button>
          </NavbarMenuItem>
          <NavbarMenuItem>

          </NavbarMenuItem>
        </section>
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar;
