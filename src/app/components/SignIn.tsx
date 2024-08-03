import { Button } from "@nextui-org/react";
import { signIn } from "@/lib/auth";
 
const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("github")
      }}
    >
      <Button
        type="submit"
        radius="full"
        className="border-primary hover:bg-primary hover:text-black transition-all"
        size="lg"
        variant="bordered"
      >
        Signin with GitHub
      </Button>
    </form>
  )
} 

export default SignIn;
