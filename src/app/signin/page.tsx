import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Button,
  Link
} from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { signIn } from "@/lib/auth";

const Signin = async () => {
  const session = await auth();

  if (session) return redirect('/craftle')

  return (
    <main className="flex h-svh w-full items-center justify-center">
      <section className="flex h-svh w-full items-center justify-center w-full h-full">
        <Card
          className="p-4"
          shadow="lg"
        >
          <CardHeader>
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl">Login</h1>
              <p className="font-mono text-xs text-secondary tracking-wide">Create an account to stack up against others.</p>
            </div>
          </CardHeader>
          <CardBody className="p-4">
            <div className="flex flex-col gap-4 w-full">
              <form className="w-full" action={async () => {
                "use server"
                await signIn("google", {redirectTo: "/craftle"})
              }}>
                <Button
                  fullWidth
                  className="font-medium"
                  color="primary"
                  type="submit"
                >
                  Google
                </Button>
              </form>
              <form className="w-full" action={async () => {
                "use server"
                await signIn("github", {redirectTo: "/craftle"})
              }}>
                <Button
                  fullWidth
                  className="font-medium"
                  color="primary"
                  type="submit"
                >
                  Github
                </Button>
              </form>
            </div>
          </CardBody>
          <CardFooter className="w-full h-full">
            <Button
              href="/craftle"
              size="sm"
              variant="light"
              as={Link}
              isIconOnly
            >
              <ArrowLeft height={30} width={30} />
            </Button>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
};

export default Signin
