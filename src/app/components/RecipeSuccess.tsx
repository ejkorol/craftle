"use client";
import { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  Image
} from "@nextui-org/react";
import Confetti from "react-dom-confetti";

interface Data {
  image: string;
  name: string;
  displayName: string;
  tries: number;
}

interface RecipeSuccessProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
  data: Data
}

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 4,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"]
};

const RecipeSuccess = ({ isOpen, onOpenChange, onClose, data }: RecipeSuccessProps) => {

  const [isExploding, setIsExploding] = useState<boolean>(false);

  useEffect(() => {
    if (isOpen) {
      setIsExploding(true);
      const timer = setTimeout(() => setIsExploding(false), config.duration);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  function getMessage(tries: number) {
    if (tries === 1) {
      return 'Excellent!';
    } else if (tries <= 3) {
      return 'Not bad!';
    } else if (tries <= 5) {
      return 'Could be better!';
    } else if (tries === 6) {
      return 'You got it!';
    }
    return '';
  }

  if (!data) return null;

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
            <Confetti active={isExploding} config={config} />
            <Image isBlurred src={`http://minecraft-api.minko.industries/images/1.19/${data.image}.png`} alt={data.displayName} width={100} height={100} />
            <h1 className="text-4xl font-serif font-bold tracking-wide my-10">{data.displayName}</h1>
            <h3 className="text-3xl font-serif font-medium tracking-normal">You crafted it in just<br/>{data.tries} {data.tries === 1 ? 'recipe' : 'recipes'}!</h3>
            <p className="text-xl font-serif font-medium tracking-normal my-10">
              {getMessage(data.tries)}
            </p>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RecipeSuccess;
