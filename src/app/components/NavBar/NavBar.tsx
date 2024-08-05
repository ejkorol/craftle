import { auth, signOut } from "@/lib/auth";
import {
  Button,
  Link,
  Navbar,
  NavbarBrand,
  NavbarItem,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Avatar,
  Divider
} from "@nextui-org/react";

import ThemeSwitcher from "./ThemeSwitcher";
import HintButton from "./HintButton";
import LeaderboardButton from "./LeaderboardButton";
import { LogOut } from "lucide-react";

const NavBar = async () => {
  const session = await auth();

  return (
    <>
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
          <LeaderboardButton />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <HintButton />
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem className="hidden sm:flex">
          {session && (
            <form action={async() => {
                "use server"
                await signOut()
              }}>
              <Button
                radius="full"
                className="border-primary hover:bg-primary hover:text-black transition-all"
                size="lg"
                variant="bordered"
                  type="submit"
              >
                Logout
              </Button>
            </form>
          )}
          {!session && (
            <Button
              radius="full"
              className="border-primary hover:bg-primary hover:text-black transition-all"
              size="lg"
              variant="bordered"
              href="/api/auth/signin"
              as={Link}
            >
              Subscribe
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <section className="flex flex-col w-full gap-8 mt-8 h-svh">
          <h2 className="text-4xl font-serif font-medium">Menu</h2>
          <NavbarMenuItem className="flex items-center gap-2">
            <HintButton>
              <h3 className="text-2xl font-medium text-secondary">Hint</h3>
            </HintButton>
          </NavbarMenuItem>
          <NavbarMenuItem className="flex items-center gap-2">
            <LeaderboardButton>
              <h3 className="text-2xl font-medium text-secondary">Leaderboard</h3>
            </LeaderboardButton>
          </NavbarMenuItem>
          {session && (
            <>
            <Divider />
            <NavbarMenuItem>
              <div className="flex gap-4 items-center justify-between">
                <div className="flex gap-4 items-center">
                  <Avatar src={session.user.image} isBordered size="lg" alt={session.user.name} />
                  <div className="flex flex-col">
                    <h3 className="font-medium text-lg">{session.user.name}</h3>
                    <p className="font-medium text-sm font-mono">{session.user.email}</p>
                  </div>
                </div>
                {session && (
                  <form action={async() => {
                      "use server"
                      await signOut()
                    }}>
                    <Button
                      size="lg"
                      variant="light"
                      type="submit"
                      isIconOnly
                    >
                      <LogOut height={30} width={30} className="text-primary" />
                    </Button>
                  </form>
                )}
              </div>
            </NavbarMenuItem>
          </>
          )}
          {!session && (
            <NavbarMenuItem>
              <Button
                radius="full"
                className="border-primary hover:bg-primary hover:text-black transition-all"
                fullWidth
                size="lg"
                variant="bordered"
                href="/api/auth/signin"
                as={Link}
              >
                Subscribe
              </Button>
            </NavbarMenuItem>
          )}
        </section>
      </NavbarMenu>
    </Navbar>
    </>
  );
}

export default NavBar;
