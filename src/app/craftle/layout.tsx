import { Metadata } from "next"
import NavBar from "@/app/components/NavBar/NavBar";

export const metadata: Metadata = {
  title: "Craftle Game",
  description: "Get 6 chances to guess a crafting recipe."
};

export default function CraftleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
