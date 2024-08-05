"use server";

import { auth } from "@/lib/auth";
import db from "@/lib/db";

interface Try {
  try: number;
  success: boolean | null;
  recipe: any;
  percentage: number;
}

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

export const getsession = async (tries: Try[]): Promise<void> => {
  const session = await auth();

  if (!session) return;

  const user = await db.user.findFirst({
    where: { email: session.user.email },
  });

  if (!user) return;

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
