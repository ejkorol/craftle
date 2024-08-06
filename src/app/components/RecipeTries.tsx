import React, { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@nextui-org/react';
import { motion } from 'framer-motion';
import RecipeAttempt, { Attempt } from './RecipeAttempt';

interface RecipeTriesProps {
  tries: Attempt[];
  currentTry: number;
}

const RecipeTries = ({ tries, currentTry }: RecipeTriesProps) => {
  const mobileModal = useDisclosure();
  const [selectedAttempt, setSelectedAttempt] = useState<Attempt | null>(null);

  const handleOpenModal = (attempt: Attempt) => {
    setSelectedAttempt(attempt);
    mobileModal.onOpen();
  };

  return (
    <div className="tries">
      {tries.map((attempt, idx) => {
        let className = '';
        let animation = {
          initial: { opacity: 0, scale: 0.8 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.8 },
        };

        switch (true) {
          case idx === currentTry + 1:
            className = "tries__current";
            animation = {
              initial: { opacity: 0, scale: 0.5 },
              animate: { opacity: 1, scale: 1.2 },
              exit: { opacity: 0, scale: 0.5 },
            };
            break;
          case attempt.success === true:
            className = 'tries__success';
            break;
          case attempt.success === false:
            className = 'tries__failed';
            break;
          case attempt.success === null:
            className = 'tries__unused';
            break;
          default:
            className = 'tries__unused';
        }

        return (
          <motion.div
            key={attempt.try}
            className={`tries__box ${className}`}
            initial={animation.initial}
            animate={animation.animate}
            exit={animation.exit}
            transition={{ duration: 0.5 }}
            onClick={ className !== 'tries__current' ? () => handleOpenModal(attempt) : undefined}
          >
            {/* Additional content can be rendered here */}
          </motion.div>
        );
      })}

      <Modal
        isOpen={mobileModal.isOpen}
        onOpenChange={mobileModal.onOpenChange}
        onClose={mobileModal.onClose}
        backdrop="blur"
        size="full"
        placement="center"
      >
        <ModalContent>
          <ModalBody>
            <section className="flex items-center h-full justify-center w-full">
              {selectedAttempt && (
                <RecipeAttempt attempts={[selectedAttempt]} currentTry={0} />
              )}
            </section>
          </ModalBody>
          <ModalFooter className="w-full flex items-center justify-center">
            <p className="font-mono uppercase text-secondary tracking-wide">
              Tap anywhere to close
            </p>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RecipeTries;
