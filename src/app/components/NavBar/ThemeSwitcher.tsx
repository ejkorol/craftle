"use client";

import { Button } from "@nextui-org/react";
import { SunDim } from "lucide-react";

import { useTheme } from "@/utils/hooks/useTheme";

const ThemeSwitcher = () => {

  const { changeTheme } = useTheme('dark');

  return (
    <Button
      className="p-2 text-secondary hover:text-primary transition-all"
      size="lg"
      variant="light"
      isIconOnly
      onClick={() => changeTheme()}
    >
      <SunDim size={40} />
    </Button>
  );
}

export default ThemeSwitcher;
