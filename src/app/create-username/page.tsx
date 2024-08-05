"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import {
  Input,
  Button,
  Card,
  CardHeader,
  Divider,
  CardBody
} from "@nextui-org/react";
import { handleSubmit } from "./actions";


const CreateUsername = () => {
  const { data: session, status, update } = useSession();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    switch (status) {
      case ("loading"):
        setIsLoading(true)
      break;
      case ("authenticated"):
        if (session.user.username) {
          router.replace('/craftle')
        }
        setIsLoading(false)
    }
  }, [session])

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const username = formData.get('username') as string;

    try {
      const res = await handleSubmit(username);

      if (!res.success) {
        throw new Error(res.message)
      } else {
        setError(null);
      }

      update({
        username: username
      })
      router.push('/craftle');
      return;
    } catch (e: any) {
      setError(e.message)
    }
  };

  if (isLoading || session?.user.username) return null;

  return (
    <main className="flex h-svh w-full items-center justify-center">
      <Card
        className="w-2/5 p-4"
        shadow="lg"
      >
        <CardHeader>
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl">{`Hey, ${session!.user.name}`}</h2>
            <h1 className="text-2xl">Create a username:</h1>
          </div>
        </CardHeader>
        <CardBody>
          {error && (
            <h3 className="font-mono text-danger mb-4 text-sm tracking-wide">{error}</h3>
          )}
          <form onSubmit={onSubmit}>
            <Input label="Username" type="text" name="username" />
            <p className="text-md mt-4 font-mono italic text-secondary">A username will put you on the leaderboards.</p>
            <Divider className="my-4" />
            <Button
              color="primary"
              radius="full"
              type="submit"
            >
              Submit</Button>
          </form>
        </CardBody>
      </Card>
    </main>
  );
};

export default CreateUsername;
