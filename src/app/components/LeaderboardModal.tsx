"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Avatar,
  Image,
  Divider,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableColumn,
  Link
} from "@nextui-org/react";
import NextImage from "next/image";
import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";

import { CircleX, ArrowUpRight } from "lucide-react";

import { fetchTopPlayers, LeaderBoardEntry } from "./LeaderboardActions";

interface LeaderboardModalProps {
  isOpen: boolean,
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const columns = [
  {
    key: 'rank',
    label: 'POSITION'
  },
  {
    key: 'user',
    label: 'USERNAME'
  },
  {
    key: 'average',
    label: 'AVG %'
  }
]

const LeaderboardModal = ({ isOpen, onClose, onOpenChange }: LeaderboardModalProps) => {

  const [topPlayers, setTopPlayers] = useState<LeaderBoardEntry[]>();
  const { data: session } = useSession();

  const getLeaderboard = async () => {
    const players = await fetchTopPlayers();
    setTopPlayers(players);
  }

  useEffect(() => {
    getLeaderboard();
  }, [])

  interface Styles {
    cardClasses: string;
    imageSrc: string;
    alt: string;
    height: number;
    width: number;
    header: string;
    avatar: "lg" | "md" | "sm";
    username: string;
    percentage: string;
  }

  const getLeaderboardStyles = (rank: 1 | 2 | 3): Styles => {
    switch (rank) {
      case (1):
        return {
          cardClasses: "flex flex-col gap-6 items-center order-2",
          imageSrc: "/icons/first-icon.svg",
          alt: "gold medal",
          height: 150,
          width: 150,
          header: "text-xl font-medium",
          avatar: "lg",
          username: "font-mono text-md tracking-wide",
          percentage: "font-mono text-secondary text-sm tracking-wider"
        }
      case (2):
        return {
          cardClasses: "flex flex-col gap-6 items-center order-1",
          imageSrc: "/icons/second-icon.svg",
          alt: "silver medal",
          height: 100,
          width: 100,
          header: "text-lg font-medium",
          avatar: "md",
          username: "font-mono text-sm tracking-wide",
          percentage: "font-mono text-secondary text-xs tracking-wider"
        }
      case (3):
        return {
          cardClasses: "flex flex-col gap-6 items-center order-3",
          imageSrc: "/icons/third-icon.svg",
          alt: "bronze medal",
          height: 100,
          width: 100,
          header: "text-lg font-medium",
          avatar: "md",
          username: "font-mono text-sm tracking-wide",
          percentage: "font-mono text-secondary text-xs tracking-wider"
        }
    }
  };

  const renderCell = useCallback((item: LeaderBoardEntry , columnKey: any) => {
    switch (columnKey) {
      case "rank":
      return (
        <h2 className="text-4xl">{`${item.rank}.`}</h2>
      );
      case "user":
      return (
        <>
          <div>
            <Avatar size="md" src={item.user.image !== null ? item.user.image : undefined} alt={item.user.name !== null ? item.user.name : 'avatar'}/>
          </div>
          <div>
            <h3 className="text-md">{item.user.name}</h3>
            <p className="font-mono text-xs tracking-wide">{`@${item.user.username}`}</p>
          </div>
        </>
      );
      case "average":
      return (
        <p className="font-mono text-3xl tracking-wider">{`${item.avg}%`}</p>
      )
    }
  }, []);

  if (!session) {
    return (
      <Modal
        backdrop="blur"
        size="lg"
        className="bg-dark"
        shadow="lg"
        hideCloseButton
        scrollBehavior="inside"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <ModalHeader className="flex items-center justify-between">
            <h1 className="text-4xl font-medium py-4">Leaderboard</h1>
            <Button
              isIconOnly
              variant="light"
              onPress={onClose}
            >
              <CircleX height={30} width={30} className="text-primary" />
            </Button>
          </ModalHeader>
          <ModalBody className="px-8 py-12">
            <section className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-medium">Sign in to see the leaderboards.</h2>
            </section>
          </ModalBody>
          <ModalFooter>
            <Button
              className="text-lg font-medium" 
              color="primary"
              variant="shadow" 
              as={Link} 
              size="lg" 
              radius="full" 
              href='/signin'
              endContent={ <ArrowUpRight width={30} height={30} className="light:text-primary dark:text-secondary" /> }
            >
              Sign in
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
  return (
    <Modal
      backdrop="blur"
      size="lg"
      className="bg-dark"
      shadow="lg"
      hideCloseButton
      scrollBehavior="inside"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <h1 className="text-4xl font-medium py-4">Leaderboard</h1>
          <Button
            isIconOnly
            variant="light"
            onPress={onClose}
          >
            <CircleX height={30} width={30} className="text-primary" />
          </Button>
        </ModalHeader>
        <ModalBody className="px-8">
          <section 
            className={topPlayers && topPlayers.slice(0, 3).length === 2 ? "flex gap-6 items-center justify-between" : "flex gap-6 items-center justify-center"}
          >

            {topPlayers && topPlayers.slice(0, 3).map((player) => {
              const styles = getLeaderboardStyles(player.rank as 1 | 2 | 3)
                return (
                  <div className={styles.cardClasses} key={player.userId}>
                    <Avatar size={styles.avatar} src={player.user.image ?? undefined} alt={player.user.name ?? undefined} />
                    <Image
                      isBlurred
                      src={styles?.imageSrc}
                      alt={styles?.alt}
                      as={NextImage}
                      height={styles?.height}
                      width={styles?.width}
                    />
                    <div className="text-center">
                      <h3 className={styles?.header}>{player.user.name}</h3>
                      <p className={styles?.username}>@{player.user.username}</p>
                      <p className={styles?.percentage}>{player.avg}%</p>
                    </div>
                  </div>
                );
              })}
          </section>

          <Divider className="mt-6 mb-4" />

          <section className="flex flex-col gap-4 max-h-[300px]">
            <h2 className="text-2xl font-medium">Ranking</h2>
            <Table 
              removeWrapper
              isStriped
            >
              <TableHeader columns={columns}>
                {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={topPlayers}>
                {item => (
                  <TableRow key={item.userId}>
                    {columnKey => <TableCell className={[
                      columnKey === 'rank' ? 'w-1/6' : null,
                      columnKey === 'user' ? 'flex items-center gap-4 w-full' : null,
                      columnKey === 'average' ? 'w-1/6' : null
                    ].filter(Boolean).join('')}>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </section>
        </ModalBody>
        <ModalFooter>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};

export default LeaderboardModal;
