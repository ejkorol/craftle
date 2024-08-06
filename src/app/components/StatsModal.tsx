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
  TableCell,
  getKeyValue
} from "@nextui-org/react";

import toast from "react-hot-toast";

import NextImage from "next/image";
import { useEffect, useState, useCallback } from "react";
import { useTheme } from "next-themes";

import { CircleX, ArrowUpRight, ClockArrowDown } from "lucide-react";

interface StatsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
  tries: Try[]
  stats: Stats
}

interface Stats {
  completed: boolean;
  success: boolean;
  tries: Try[];
  gamesPlayed: number;
  currentStreak: number;
  bestStreak: number;
  totalWon: number;
}

interface Try {
  try: number;
  success: boolean | null;
  recipe: any;
  percentage: number;
}

const columns = [
  {
    key: 'try',
    label: 'TRY'
  },
  {
    key: 'percentage',
    label: 'AVG %'
  }
]

export const StatsModal = ({ isOpen, onClose, onOpenChange, tries, stats }: StatsModalProps) => {

  const [redirectTime, setRedirectTime] = useState(3);
  const [intervalId, setIntervalId] = useState<any>(null);
  const { theme } = useTheme();
  console.log(theme)

  useEffect(() => {
    // Clear the interval if the component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  const getSliderColor = (percentage: number) => {
    if (percentage >= 0 && percentage < 15) {
      return 'secondary';
    } else if (percentage >= 15 && percentage < 30) {
      return 'danger';
    } else if (percentage >= 30 && percentage < 55) {
      return 'warning';
    } else if (percentage >= 55 && percentage <= 100) {
      return 'success';
    }
  };

  const renderCell = useCallback((item: Try, columnKey: any) => {
    switch (columnKey) {
      case "try":
      return (
        <Button
          color={ theme === 'light' ? 'primary' : 'secondary'}
          disabled
          isIconOnly
          className="text-lg font-mono"
          size="sm"
          radius="md"
        >
          {getKeyValue(item, columnKey)}
        </Button>
      );
      case "percentage":
      const sliderColor = getSliderColor(item.percentage);
      return (
        <div className="relative w-full h-full">
          <Slider
            classNames={{
              track: 'bg-transparent',
              filler: 'bg-transparent'
            }}
            size="lg"
            aria-label="Player progress"
            color={sliderColor}
            hideThumb
            maxValue={100}
            minValue={0}
            value={item.percentage}
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="text-center text-sm font-mono tracking-wide">{`${item.percentage}%`}</p>
          </div>
        </div>
      );
    }
  }, []);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Craftle',
          text: 'Check out this awesome app!',
          url: window.location.href,
        });
      console.log('Success');
      } catch (error) {
        console.error('Error:', error);
        toast('Sorry! there was an error sharing', {
          icon: '😪',
          style: {
            border: '2px solid #fafafa',
            padding: '16px',
            backgroundColor: '#212121',
            color: '#fafafa'
          },
        });
      }
    } else {
      console.log('Web Share not supported');
      toast('Sorry! The Web Share API is not supported in your browser', {
        icon: '😪',
        style: {
          border: '2px solid #fafafa',
          padding: '16px',
          backgroundColor: '#212121',
          color: '#fafafa'
        },
      });
    }
  };

  const handleStronghold = () => {
    const newUrl = 'https://www.jasonkorol.ca';

    const redirectPromise = new Promise((resolve, _reject) => {
      const id = setInterval(() => {
        setRedirectTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(id);
            window.open(newUrl, '_blank');
            resolve('Redirect completed');
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      setIntervalId(id);
    });

    toast.promise(
      redirectPromise,
      {
        loading: 'Redirecting...',
        success: <b>Redirect successful!</b>,
        error: <b>Could not redirect.</b>,
      },
      {
        style: {
          border: '2px solid #fafafa',
          padding: '16px',
          backgroundColor: '#212121',
          color: '#fafafa'
        }
      }
    );
  };

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
            { theme === 'dark' ?
              <Image radius="none" isBlurred src="/icons/craftle-logo-light.svg" as={NextImage} width={45} height={45} alt="logo" />
              :
              <Image radius="none" isBlurred src="/icons/craftle-logo.svg" as={NextImage} width={45} height={45} alt="logo" />
            }
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
                <h4 className="text-6xl font-mono">{stats.gamesPlayed}</h4>
                <p className="">played</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">
                  {stats.gamesPlayed > 0 ? Math.round((stats.totalWon / stats.gamesPlayed) * 100) : 0}
                </h4>
                <p className="">Win %</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">{stats.currentStreak}</h4>
                <p className="">Streak</p>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h4 className="text-6xl font-mono">{stats.bestStreak}</h4>
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
              <TableHeader columns={columns}>
                {column => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody items={tries}>
                {item => (
                  <TableRow key={item.try}>
                    {columnKey => <TableCell className={columnKey === 'percentage' ? 'w-full' : ''}>{renderCell(item, columnKey)}</TableCell>}
                  </TableRow>
                )}
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
            onPress={handleStronghold}
          >
            Explore the Stronghold
          </Button>
          <Button
            color="success"
            variant="shadow"
            radius="full"
            className="text-primary font-medium"
            endContent={ <ArrowUpRight height={24} width={24} className="text-primary" /> }
            onPress={handleShare}
          >
            Share
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
