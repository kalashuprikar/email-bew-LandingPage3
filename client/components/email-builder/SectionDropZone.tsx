import React from "react";
import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import { ContentBlock } from "./types";
import { Plus } from "lucide-react";

interface SectionDropZoneProps {
  sectionId: string;
  position?: number;
  onBlockDrop: (block: ContentBlock, sectionId: string, position?: number) => void;
  isEmpty?: boolean;
}

export const SectionDropZone: React.FC<SectionDropZoneProps> = ({
  sectionId,
  position,
  onBlockDrop,
  isEmpty = false,
}) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "block",
    drop: (item: any) => {
      if (item.block) {
        onBlockDrop(item.block, sectionId, position);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  if (isEmpty) {
    return (
      <div
        ref={drop}
        className={cn(
          "w-full min-h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center transition-all",
          isOver && "border-valasys-orange bg-orange-50"
        )}
      >
        <div className="text-center text-gray-400">
          <Plus className="w-6 h-6 mx-auto mb-2" />
          <p className="text-sm font-medium">Drop blocks here</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={drop}
      className={cn(
        "h-1 w-full my-2 transition-all cursor-default",
        isOver ? "h-3 bg-valasys-orange rounded" : "bg-gray-200"
      )}
    />
  );
};
