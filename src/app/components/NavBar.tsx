"use client";

import { Button, Link } from "@nextui-org/react";
import {
  ChartColumnBig,
  CircleHelp,
  SunDim,
  Menu,
} from "lucide-react";
import { useTheme } from "@/utils/hooks/useTheme";

const NavBar = () => {

  const { changeTheme } = useTheme('dark');

  return (
    <nav className="flex justify-between item-center px-8 py-6 border-b-2 border-solid border-secondary">
      <div>
        <Link
          href="/"
          className="text-5xl font-serif font-medium select-none cursor-pointer hover:text-secondary transition-all"
        >
          Craftle
        </Link>
      </div>
      <div className="hidden md:flex">
        <div className="flex gap-6">
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
        </div>
        <div className="ml-16">
          <Button
            radius="full"
            className="border-primary hover:bg-primary hover:text-black transition-all"
            size="lg"
            variant="bordered"
          >
            Subscribe
          </Button>
        </div>
      </div>
      <div className="flex md:hidden">
        <Button
          className="p-2 text-secondary hover:text-primary transition-all"
          size="lg"
          variant="light"
          isIconOnly
        >
          <Menu
            size={40}
          />
        </Button>
      </div>
    </nav>
  );
}

export default NavBar;
