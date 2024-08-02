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
import { Search, CircleX } from "lucide-react";

interface InventoryModalProps {
  onSelect: (item: Item) => void;
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

  return (
    <Modal
      backdrop="blur"
      size="lg"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="bg-dark"
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
          <Input
            size="lg"
            type="text"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
            startContent={
              <Search className="text-secondary" height={24} width={24} />
            }
          />
          <section className="flex gap-4">
            <main className="w-full">
              <div className="grid grid-cols-5 gap-4 place-items-center w-full max-h-[50vh] rounded-lg p-[16px]">
                {filteredItems &&
                  filteredItems.map((item: Item) => (
                    <div
                      key={item.id}
                      className="bg-black w-[50px] h-[50px] rounded-lg flex justify-center items-center cursor-pointer"
                      onClick={() => onSelect(item)}
                    >
                      <Tooltip content={item.displayName} placement="top">
                        <Image
                          height={30}
                          width={30}
                          src={`http://minecraft-api.minko.industries${item.image}`}
                          alt={item.displayName}
                        />
                      </Tooltip>
                    </div>
                  ))}
              </div>
            </main>
          </section>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InventoryModal;
