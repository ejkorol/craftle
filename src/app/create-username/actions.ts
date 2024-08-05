"use server"

import { auth } from "@/lib/auth";
import db from "@/lib/db";

export const handleSubmit = async (username: string) => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error('User session not found.')
    }

    if (!username) {
      throw new Error('Username required.')
    }

    const foundUser = await db.user.findFirst({
      where: { username }
    })

    if (foundUser) {
      throw new Error('Username taken.')
    }

    const user = await db.user.update({
      where: { email: session?.user.email },
      data: { username }
    });

    return { success: true, user };

  } catch (e: any) {
    console.error("Error in username update: ", e);
    return { success: false, message: e.message }
  }
};
