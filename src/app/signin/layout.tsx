import { Metadata } from "next"
import NavBar from "@/app/components/NavBar";

export const metadata: Metadata = {
  title: "Signin",
  description: "Signin to subscribe"
};

export default function CraftleLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
