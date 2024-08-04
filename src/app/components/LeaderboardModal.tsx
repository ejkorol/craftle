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
  TableColumn
} from "@nextui-org/react";
import NextImage from "next/image";
import { useCallback } from "react";

import { CircleX } from "lucide-react";

interface LeaderboardModalProps {
  isOpen: boolean,
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

interface User {
  id: string;
  rank: number;
  user: UserInfo;
  average: number
}

interface UserInfo {
  username: string;
  name: string;
  image: string;
}

const users = [
  {
    id: "123abcd",
    rank: 1,
    user: {
      username: 'ejkorol',
      name: 'Jason Korol',
      image: 'https://avatars.githubusercontent.com/u/65996263?v=4'
    },
    average: 88
  }
]

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

  const renderCell = useCallback((item: User , columnKey: any) => {
    switch (columnKey) {
      case "rank":
      return (
        <h2 className="text-4xl">{`${item.rank}.`}</h2>
      );
      case "user":
      return (
        <>
          <div>
            <Avatar size="md" src={item.user.image} alt={item.user.name}/>
          </div>
          <div>
            <h3 className="text-md">{item.user.name}</h3>
            <p className="font-mono text-xs tracking-wide">{`@${item.user.username}`}</p>
          </div>
        </>
      );
      case "average":
      return (
        <p className="font-mono text-3xl tracking-wider">{`${item.average}%`}</p>
      )
    }
  }, []);

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
          <section className="flex gap-6 items-center justify-between">
            <div className="flex flex-col gap-6 items-center">
              <Avatar size="md" />
              <Image
                src="/icons/second-icon.svg"
                alt="gold medal"
                as={NextImage}
                height={100}
                width={100}
              />
              <div className="text-center">
                <h3 className="text-lg font-medium">John Doe</h3>
                <p className="font-mono text-sm tracking-wide">@johndoe</p>
                <p className="font-mono text-secondary text-xs tracking-wider">
                  66%
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <Avatar size="lg" />
              <Image
                isBlurred
                src="/icons/first-icon.svg"
                alt="gold medal"
                as={NextImage}
                height={150}
                width={150}
              />
              <div className="text-center">
                <h3 className="text-xl font-medium">Yam</h3>
                <p className="font-mono text-md tracking-wide">@yamlovesyam</p>
                <p className="font-mono text-secondary text-sm tracking-wider">
                  81%
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center">
              <Avatar size="md" />
              <Image
                src="/icons/third-icon.svg"
                alt="gold medal"
                as={NextImage}
                height={100}
                width={100}
              />
              <div className="text-center">
                <h3 className="text-lg font-medium">Jane Doe</h3>
                <p className="font-mono text-sm tracking-wide">@janedoe</p>
                <p className="font-mono text-secondary text-xs tracking-wider">
                  33%
                </p>
              </div>
            </div>

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
              <TableBody items={users}>
                {item => (
                  <TableRow key={item.id}>
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
