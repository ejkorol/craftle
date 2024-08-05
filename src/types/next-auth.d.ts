import NextAuth from 'next-auth';
import { User as PrismaUser } from '@prisma/client';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string | null;
    } & NextAuth.User;
  }

  interface User extends PrismaUser {}
}
