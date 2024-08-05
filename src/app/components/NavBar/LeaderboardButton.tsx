"use client";

import { Button, useDisclosure } from "@nextui-org/react";
import { ChartColumnBig } from "lucide-react";
import LeaderboardModal from "../LeaderboardModal";
import { ReactNode } from "react";

const LeaderboardButton = ({ children }: { children?: ReactNode }) => {

  const leaderboardModal = useDisclosure();

  return (
    <>
      <Button
        className="p-2 text-secondary hover:text-primary transition-all"
        size="lg"
        variant="light"
        isIconOnly={children ? false : true}
        onPress={() => leaderboardModal.onOpen()}
        startContent={<ChartColumnBig size={40} />}
      >
        {children}
      </Button>
      <LeaderboardModal
        isOpen={leaderboardModal.isOpen}
        onClose={leaderboardModal.onClose}
        onOpenChange={leaderboardModal.onOpenChange}
      />
    </>
  );
}

export default LeaderboardButton;
