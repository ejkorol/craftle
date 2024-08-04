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

import { CircleX } from "lucide-react";

interface LeaderboardModalProps {
  isOpen: boolean,
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const LeaderboardModal = ({ isOpen, onClose, onOpenChange }: LeaderboardModalProps) => {
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
              <TableHeader>
                <TableColumn>Position</TableColumn>
                <TableColumn>Username</TableColumn>
                <TableColumn>Avg %</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell className="w-1/6">
                    <h2 className="text-4xl">4.</h2>
                  </TableCell>
                  <TableCell className="flex items-center gap-4 w-full">
                    <div>
                    <Avatar size="md"/>
                    </div>
                    <div>
                    <h3 className="text-md">Jason Korol</h3>
                    <p className="font-mono text-xs tracking-wide">@ejkorol</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6">
                    <p className="font-mono text-3xl tracking-wider">44%</p>
                  </TableCell>
                </TableRow>
                <TableRow key="1">
                  <TableCell className="w-1/6">
                    <h2 className="text-4xl">4.</h2>
                  </TableCell>
                  <TableCell className="flex items-center gap-4 w-full">
                    <div>
                    <Avatar size="md"/>
                    </div>
                    <div>
                    <h3 className="text-md">Jason Korol</h3>
                    <p className="font-mono text-xs tracking-wide">@ejkorol</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6">
                    <p className="font-mono text-3xl tracking-wider">44%</p>
                  </TableCell>
                </TableRow>
                <TableRow key="1">
                  <TableCell className="w-1/6">
                    <h2 className="text-4xl">4.</h2>
                  </TableCell>
                  <TableCell className="flex items-center gap-4 w-full">
                    <div>
                    <Avatar size="md"/>
                    </div>
                    <div>
                    <h3 className="text-md">Jason Korol</h3>
                    <p className="font-mono text-xs tracking-wide">@ejkorol</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6">
                    <p className="font-mono text-3xl tracking-wider">44%</p>
                  </TableCell>
                </TableRow>
                <TableRow key="1">
                  <TableCell className="w-1/6">
                    <h2 className="text-4xl">4.</h2>
                  </TableCell>
                  <TableCell className="flex items-center gap-4 w-full">
                    <div>
                    <Avatar size="md"/>
                    </div>
                    <div>
                    <h3 className="text-md">Jason Korol</h3>
                    <p className="font-mono text-xs tracking-wide">@ejkorol</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6">
                    <p className="font-mono text-3xl tracking-wider">44%</p>
                  </TableCell>
                </TableRow>
                <TableRow key="1">
                  <TableCell className="w-1/6">
                    <h2 className="text-4xl">4.</h2>
                  </TableCell>
                  <TableCell className="flex items-center gap-4 w-full">
                    <div>
                    <Avatar size="md"/>
                    </div>
                    <div>
                    <h3 className="text-md">Jason Korol</h3>
                    <p className="font-mono text-xs tracking-wide">@ejkorol</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6">
                    <p className="font-mono text-3xl tracking-wider">44%</p>
                  </TableCell>
                </TableRow>
                <TableRow key="1">
                  <TableCell className="w-1/6">
                    <h2 className="text-4xl">4.</h2>
                  </TableCell>
                  <TableCell className="flex items-center gap-4 w-full">
                    <div>
                    <Avatar size="md"/>
                    </div>
                    <div>
                    <h3 className="text-md">Jason Korol</h3>
                    <p className="font-mono text-xs tracking-wide">@ejkorol</p>
                    </div>
                  </TableCell>
                  <TableCell className="w-1/6">
                    <p className="font-mono text-3xl tracking-wider">44%</p>
                  </TableCell>
                </TableRow>
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
