"use client";
import { useState, useEffect } from "react";
import dailyHints from "@/utils/dailyHints";

import {
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody,
  ModalFooter,
  Button,
  Spacer
} from "@nextui-org/react";
import { CircleX } from "lucide-react";
import { useDate } from "@/utils/hooks/useDate";

interface TodaysHintModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

const TodaysHintModal = ({ isOpen, onClose, onOpenChange }: TodaysHintModalProps) => {

  const { date } = useDate("MMMM do, yyyy");
  const [hint, setHint] = useState<string | null>(null);

  const setTodaysHint = () => {
    const d = new Date();
    const today = (d.toISOString().split('T')[0]);
    const todaysHint = dailyHints[`${today}`];
    setHint(todaysHint);
  }

  useEffect(() => {
    setTodaysHint();
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
          <h1 className="text-4xl font-medium py-4">Today's hint</h1>
          <Button isIconOnly variant="light" onPress={onClose}>
            <CircleX height={30} width={30} className="text-primary" />
          </Button>
        </ModalHeader>
        <ModalBody className="px-8">
          <p className="font-mono text-lg whitespace-pre-wrap">{`${hint}`}</p>
          <Spacer y={4}/>
          <p className="font-mono text-sm tracking-wide text-primary/40 dark:text-secondary italic">
            You have 6 chances to guess a recipe;
            <br/>
            each row can (and should be) be used,
            <br/>
            but (sometimes) not every square.
          </p>
        </ModalBody>
        <ModalFooter className="flex items-center justify-between">
          <h3 className="mt-4 font-medium text-primary/40 dark:text-secondary italic tracking-wide">{date}</h3>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TodaysHintModal
