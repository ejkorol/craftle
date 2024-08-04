import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Image,
  Slider,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableColumn,
  TableCell
} from "@nextui-org/react";

import NextImage from "next/image";

import { CircleX, ArrowUpRight, ClockArrowDown } from "lucide-react";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

export const StatsModal = ({ isOpen, onClose, onOpenChange }: StatsModalProps) => {
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
          <div className="flex gap-4 items-center">
            <Image radius="none" isBlurred src="/icons/craftle-logo-light.svg" as={NextImage} width={45} height={45} alt="logo" />
            <h1 className="text-4xl font-serif font-bold py-4">Craftle</h1>
          </div>
          <Button
            isIconOnly
            variant="light"
            onPress={onClose}
          >
            <CircleX height={30} width={30} className="text-primary" />
          </Button>
        </ModalHeader>
        <ModalBody className="px-4">
          <section>
            <h3 className="text-sm font-medium tracking-wide uppercase">statistics</h3>
            <div className="flex items-center justify-between my-4">
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">1</h4>
                <p className="">played</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">0</h4>
                <p className="">Win %</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">1</h4>
                <p className="">Streak</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">1</h4>
                <p className="">Best Streak</p>
              </div>
            </div>
          </section>
          <section className="my-4">
            <h3 className="text-sm font-medium tracking-wide uppercase">guess distribution</h3>
            <Table
              className="my-4"
              removeWrapper
              hideHeader
            >
              <TableHeader>
                <TableColumn>try</TableColumn>
                <TableColumn>distribution</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Button
                      color="secondary"
                      disabled
                      isIconOnly
                      className="text-lg font-mono"
                      size="sm"
                      radius="md"
                    >
                      1
                    </Button>
                  </TableCell>
                  <TableCell className="w-full">
                    <Slider 
                      className="max-w-md"
                      size="md"
                      aria-label="Player progress" 
                      color="foreground"
                      hideThumb={true}
                      isDisabled
                      defaultValue={20}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      color="secondary"
                      disabled
                      isIconOnly
                      className="text-lg font-mono"
                      size="sm"
                      radius="md"
                    >
                      2
                    </Button>
                  </TableCell>
                  <TableCell className="w-full">
                    <Slider 
                      className="max-w-md"
                      size="md"
                      aria-label="Player progress" 
                      color="foreground"
                      hideThumb={true}
                      defaultValue={20}
                      isDisabled
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      color="secondary"
                      disabled
                      isIconOnly
                      className="text-lg font-mono"
                      size="sm"
                      radius="md"
                    >
                      3
                    </Button>
                  </TableCell>
                  <TableCell className="w-full">
                    <Slider 
                      className="max-w-md"
                      size="md"
                      aria-label="Player progress" 
                      color="foreground"
                      hideThumb={true}
                      isDisabled
                      defaultValue={20}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      color="secondary"
                      disabled
                      isIconOnly
                      className="text-lg font-mono"
                      size="sm"
                      radius="md"
                    >
                      4
                    </Button>
                  </TableCell>
                  <TableCell className="w-full">
                    <Slider 
                      className="max-w-md"
                      size="md"
                      aria-label="Player progress" 
                      color="foreground"
                      hideThumb={true}
                      defaultValue={20}
                      isDisabled
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      color="secondary"
                      disabled
                      isIconOnly
                      className="text-lg font-mono"
                      size="sm"
                      radius="md"
                    >
                      5
                    </Button>
                  </TableCell>
                  <TableCell className="w-full">
                    <Slider 
                      className="max-w-md"
                      size="md"
                      aria-label="Player progress" 
                      color="foreground"
                      hideThumb={true}
                      defaultValue={20}
                      isDisabled
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Button
                      color="secondary"
                      disabled
                      isIconOnly
                      className="text-lg font-mono"
                      size="sm"
                      radius="md"
                    >
                      6
                    </Button>
                  </TableCell>
                  <TableCell className="w-full">
                    <Slider 
                      className="max-w-md"
                      size="md"
                      isDisabled
                      aria-label="Player progress" 
                      color="foreground"
                      hideThumb={true}
                      defaultValue={20}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </section>
        </ModalBody>
        <ModalFooter className="flex items-center justify-between">
          <Button
            color="primary"
            variant="light"
            className="font-medium"
            disabled
            endContent={ <ClockArrowDown height={24} width={24} className="text-primary" /> }
          >
            Explore the Stronghold
          </Button>
          <Button
            color="success"
            variant="shadow"
            radius="full"
            className="text-primary font-medium"
            endContent={ <ArrowUpRight height={24} width={24} className="text-primary" /> }
          >
            Share
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
