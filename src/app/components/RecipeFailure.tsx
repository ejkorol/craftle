"use client";

import {
  Modal,
  ModalContent,
  ModalBody,
  Button
} from "@nextui-org/react";

interface RecipeFailureProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

const RecipeFailure = ({ isOpen, onOpenChange, onClose }: RecipeFailureProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="full"
      backdrop="blur"
      className="bg-dark"
      shadow="lg"
      hideCloseButton
    >
      <ModalContent>
        <ModalBody>
          <section className="flex flex-col h-svh w-full items-center justify-center text-center">
            <h1 className="text-4xl font-serif font-bold tracking-wide my-10">
              Thanks for playing today!
            </h1>
            <Button
              radius="full"
              variant="shadow"
              color="danger"
              onPress={onClose}
            >
              Close
            </Button>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
};

export default RecipeFailure;
