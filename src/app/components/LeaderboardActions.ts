"use server";

import db from "@/lib/db";

export interface LeaderBoardEntry {
  rank: number;
  userId: string;
  avg: number;
  user: {
    name: string | null;
    username: string | null;
    image: string | null;
  };
}

export const fetchTopPlayers = async (): Promise<LeaderBoardEntry[]> => {
  try {
    const topPlayers = await db.leaderBoard.findMany({
      orderBy: {
        rank: 'asc',
      },
      take: 10,
      include: {
        user: {
          select: {
            name: true,
            username: true,
            image: true
          },
        },
      },
    });

    return topPlayers.map(player => ({
      rank: player.rank,
      userId: player.userId,
      avg: Math.round(player.avg),
      user: {
        name: player.user?.name ?? null,
        username: player.user?.username ?? null,
        image: player.user?.image ?? null
      },
    }));
  } catch (error) {
    console.error('Error fetching top players:', error);
    throw new Error('Failed to fetch top players');
  }
};
