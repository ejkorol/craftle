"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { CircleHelp } from "lucide-react";

import TodaysHintModal from "../TodaysHintModal";
import { ReactNode } from "react";

const HintButton = ({ children }: { children?: ReactNode }) => {

  const hintModal = useDisclosure();

  return (
    <>
    <Button
      className="p-2 text-secondary hover:text-primary transition-all"
      size="lg"
      variant="light"
      isIconOnly={children ? false : true}
      onPress={() => hintModal.onOpen()}
      startContent={<CircleHelp size={40} />}
    >
      {children}
    </Button>
    <TodaysHintModal
      isOpen={hintModal.isOpen}
      onClose={hintModal.onClose}
      onOpenChange={hintModal.onOpenChange}
    />
    </>
  );
}

export default HintButton;
