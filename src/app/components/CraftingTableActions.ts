"use server";

import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import db from "@/lib/db";
import { Game } from "@prisma/client";

interface Try {
  try: number;
  success: boolean | null;
  recipe: any;
  percentage: number;
}

export const setCookie = async (
  success: boolean,
  tries: Try[],
  gamesPlayed: number,
  currentStreak: number,
  bestStreak: number,
  totalWon: number
) => {
  const d = new Date();
  const fd = d.toISOString().split('T')[0];
  cookies().set({
    name: 'craftleDaily',
    value: JSON.stringify({
      date: fd,
      success,
      tries,
      gamesPlayed,
      currentStreak,
      bestStreak,
      totalWon
    }),
    httpOnly: true,
    path: '/'
  });
};

export const getCookie = async () => {
  const cookie = cookies().get('craftleDaily');
  return cookie;
};

const calculateAveragePercentage = (tries: Try[]): number => {
  if (tries.length === 0) return 0;
  const totalPercentage = tries.reduce((sum, currentTry) => sum + currentTry.percentage, 0);
  return totalPercentage / tries.length;
};

const calculateAverage = (num1: number, num2: number): number => (num1 + num2) / 2;

interface UserScore {
  id: string;
  avgAccuracy: number;
}

const calculateWinStreaks = (games: Game[]) => {
  let longestStreak = 0;
  let currentStreak = 0;
  let ongoingStreak = 0;

  games.forEach(game => {
    if (game.solved) {
      currentStreak++;
      ongoingStreak++;
      if (currentStreak > longestStreak) {
        longestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
      ongoingStreak = 0;
    }
  });

  return { longestStreak, currentStreak: ongoingStreak };
};

const updateUserRanks = async (): Promise<void> => {
  try {
    const userScores = await db.user.findMany({
      select: {
        id: true,
        avgAccuracy: true,
      },
    });

    const filteredUserScores: UserScore[] = userScores
      .filter(user => user.avgAccuracy !== null)
      .map(user => ({
        id: user.id,
        avgAccuracy: user.avgAccuracy || 0,
      }));

    if (filteredUserScores.length === 0) {
      console.log('No valid users found.');
      return;
    }

    filteredUserScores.sort((a, b) => b.avgAccuracy - a.avgAccuracy);

    for (let rank = 1; rank <= filteredUserScores.length; rank++) {
      const { id: userId, avgAccuracy } = filteredUserScores[rank - 1];
      await db.leaderBoard.upsert({
        where: { userId },
        update: { rank, avg: avgAccuracy },
        create: { userId, rank, avg: avgAccuracy },
      });
    }

    console.log('Leaderboard updated successfully.');
  } catch (error) {
    console.error('Error updating leaderboard:', error);
  }
};

export const getsession = async (tries: Try[], craftSuccess: boolean): Promise<void> => {
  const session = await auth();

  if (!session) {
    const prevCookie = cookies().get('craftleDaily');
    let gamesPlayed = 0;
    let currentStreak = 0;
    let bestStreak = 0;
    let totalWon = 0;

    if (prevCookie) {
      const prevStats = JSON.parse(prevCookie.value);
      gamesPlayed = prevStats.gamesPlayed || 0;
      currentStreak = prevStats.currentStreak || 0;
      bestStreak = prevStats.bestStreak || 0;
      totalWon = prevStats.totalWon || 0;
    }

    gamesPlayed++;
    if (craftSuccess) {
      totalWon++;
      currentStreak++;
      if (currentStreak > bestStreak) {
        bestStreak = currentStreak;
      }
    } else {
      currentStreak = 0;
    }

    await setCookie(craftSuccess, tries, gamesPlayed, currentStreak, bestStreak, totalWon);
    return;
  }

  const user = await db.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user) return;

  const userGames = await db.game.findMany({
    where: { userId: user.id },
    orderBy: {
      createdAt: 'asc'
    }
  });

  const totalUserGames = await db.game.count({
    where: { userId: user.id }
  });

  const totalUserGamesWon = await db.game.count({
    where: {
      userId: user.id,
      solved: true
    }
  });

  const { longestStreak, currentStreak } = calculateWinStreaks(userGames);

  await setCookie(craftSuccess, tries, totalUserGames, currentStreak, longestStreak, totalUserGamesWon);

  const userId = user.id;
  const averagePercentage = calculateAveragePercentage(tries);
  const newAverage = user.avgAccuracy ? calculateAverage(averagePercentage, user.avgAccuracy) : averagePercentage;

  const success = tries.some(trial => trial.success === true);

  await db.user.update({
    where: { email: session.user.email },
    data: { avgAccuracy: newAverage },
  });

  const newGameEntry = await db.game.create({
    data: {
      userId,
      date: new Date().toISOString().split('T')[0],
      solved: success,
      accuracy: newAverage,
      tries: JSON.stringify(tries),
    },
  });

  await db.leaderBoard.upsert({
    where: { userId },
    update: { avg: newAverage },
    create: { userId, rank: 0, avg: newAverage },
  });

  console.log('Session processed:', session);
  console.log('User:', user);
  console.log('New Game Entry:', newGameEntry);

  await updateUserRanks();
};
