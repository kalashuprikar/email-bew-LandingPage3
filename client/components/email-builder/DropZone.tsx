import React, { memo } from "react";
import { useDrop } from "react-dnd";
import { cn } from "@/lib/utils";
import { ContentBlock } from "./types";
import { Plus } from "lucide-react";

interface DropZoneProps {
  position: number;
  onBlockDrop: (block: ContentBlock, position: number) => void;
  isEmpty?: boolean;
}

const DropZoneComponent: React.FC<DropZoneProps> = ({
  position,
  onBlockDrop,
  isEmpty = false,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: "block",
      drop: (item: any, monitor) => {
        if (item && item.block) {
          onBlockDrop(item.block, position);
          return { handled: true };
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
        canDrop: !!monitor.canDrop(),
      }),
    }),
    [position, onBlockDrop]
  );

  if (isEmpty) {
    return (
      <div
        ref={drop}
        className={cn(
          "w-full py-12 px-4 border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-all duration-200",
          isOver && canDrop
            ? "border-valasys-orange bg-orange-100 scale-105"
            : "border-gray-300 bg-gray-50 hover:border-valasys-orange hover:bg-orange-50"
        )}
        style={{ minHeight: "150px", cursor: "grab" }}
      >
        <Plus className={cn(
          "w-10 h-10 mb-3 transition-all",
          isOver ? "text-valasys-orange scale-125" : "text-gray-400"
        )} />
        <p className={cn(
          "font-semibold transition-colors",
          isOver ? "text-valasys-orange" : "text-gray-700"
        )}>
          {isOver ? "Release to add block" : "Drop a block here"}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Drag any block from the left sidebar
        </p>
      </div>
    );
  }

  return (
    <div
      ref={drop}
      className={cn(
        "w-full transition-all rounded-md my-2 pointer-events-auto"
      )}
      style={{
        minHeight: "32px",
        cursor: "grab",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isOver && canDrop ? "rgba(255, 106, 0, 0.2)" : "rgba(0, 0, 0, 0.02)",
        border: isOver && canDrop ? "2px solid rgb(255, 106, 0)" : "2px dashed rgb(200, 200, 200)",
      }}
    >
      <span className={cn(
        "text-xs font-medium transition-all",
        isOver && canDrop ? "text-valasys-orange opacity-100" : "text-gray-400 opacity-60"
      )}>
        {isOver && canDrop ? "📥 Drop here to add block" : "Drop zone"}
      </span>
    </div>
  );
};

export const DropZone = memo(DropZoneComponent);
