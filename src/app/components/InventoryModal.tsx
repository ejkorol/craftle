"use client";
import { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  Button,
  Tooltip,
  Image
} from "@nextui-org/react";
import { Search, CircleX, CircleSlash2, Trash } from "lucide-react";

interface InventoryModalProps {
  onSelect: (item: Item | null) => void;
  items: Item[]
  isOpen: boolean;
  onClose: () => void;
  onOpenChange: (isOpen: boolean) => void;
}

interface Item {
  id: number,
  name: string,
  displayName: string,
  image: string,
  stackSize: number,
  enchantCategories: any,
  repairWith: any,
  maxDurability: any
}

const InventoryModal = ({ onSelect, items, isOpen, onClose, onOpenChange }: InventoryModalProps) => {

  const [query, setQuery] = useState<string>('');
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);

  useEffect(() => {
    setFilteredItems(items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()) ||
      item.displayName.toLowerCase().includes(query.toLowerCase())
    ))
  }, [query]);

  const handleClear = () => {
    onSelect(null)
  };

  return (
    <Modal
      backdrop="blur"
      size="lg"
      classNames={{
        base: "bg-dark"
      }}
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      shadow="lg"
      hideCloseButton
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalHeader className="flex items-center justify-between">
          <h1 className="text-4xl font-medium py-4">Inventory</h1>
          <Button isIconOnly variant="light" onPress={onClose}>
            <CircleX height={30} width={30} className="text-primary" />
          </Button>
        </ModalHeader>
        <ModalBody>
          <div className="flex gap-4 items-center">
          <Input
            size="lg"
            type="text"
            classNames={{
              input: [
                "bg-transparent",
                "placeholder:text-default-700/50 dark:placeholder:text-white/60"
              ],
              innerWrapper: "bg-transparent",
              label: "text-black/50 dark:text-white/90",
              inputWrapper: [
                "shadow-xl",
                "bg-secondary-400/50",
                "dark:bg-secondary-500",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-secondary-600/70",
                "dark:hover:bg-secondary-600",
                "group-data-[focus=true]:bg-default-200/50",
                "dark:group-data-[focus=true]:bg-secondary-600",
                "!cursor-text",
              ],
            }}
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            startContent={
              <Search className="text-secondary-600 dark:text-secondary " height={24} width={24} />
            }
          />
          <Button
            onPress={handleClear} 
            size="lg" 
            color="danger" 
            variant="shadow" 
            isIconOnly
            >
              <Trash height={20} width={20} className="text-white dark:text-primary" />
            </Button>
          </div>
          <section className="flex gap-4">
            <main className="w-full mb-4 mt-2">
              <div className="grid grid-cols-5 gap-4 place-items-center w-full bg-secondary-500 rounded-xl p-[16px]">
                {filteredItems.length === 0 ? (
                    <div
                      className="bg-secondary-600 w-[50px] h-[50px] rounded-lg flex justify-center items-center"
                    >
                      <CircleSlash2 height={30} width={30} className="text-white dark:text-primary" />
                    </div>
                ) : (
                  filteredItems.map((item: Item) => (
                    <div
                      key={item.id}
                      className="bg-secondary-600 w-[50px] h-[50px] rounded-lg flex justify-center items-center cursor-pointer"
                      onClick={() => onSelect(item)}
                    >
                      <Tooltip content={item.displayName} placement="top">
                        <Image
                          height={30}
                          width={30}
                          src={`/api/fetch-image?url=${encodeURIComponent(`http://minecraft-api.minko.industries${item.image}`)}`}
                          alt={item.displayName}
                        />
                      </Tooltip>
                    </div>
                  ))
                )}
              </div>
            </main>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InventoryModal;
