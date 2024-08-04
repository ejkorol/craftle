"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

      router.push('/craftle');
      console.log(res)
      return;
    } catch (e: any) {
      setError(e.message)
    }
  };

  return (
    <main className="flex h-svh w-full items-center justify-center">
      <Card
        className="w-2/5 p-4"
        shadow="lg"
      >
        <CardHeader>
          <h1 className="text-3xl">Create a username:</h1>
        </CardHeader>
        <CardBody>
          {error && (
            <h3 className="font-mono text-danger mb-4 text-sm tracking-wide">{error}</h3>
          )}
          <form onSubmit={onSubmit}>
            <Input label="Username" type="text" name="username" />
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
