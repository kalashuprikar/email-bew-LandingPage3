import React, { useState } from "react";
import { EmailSection, ContentBlock } from "./types";
import { DraggableBlock } from "./DraggableBlock";
import { SectionDropZone } from "./SectionDropZone";
import { ChevronDown, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SectionContainerProps {
  section: EmailSection;
  selectedBlockId: string | null;
  editingBlockId: string | null;
  selectedFooterElement?: string | null;
  onBlockUpdate: (block: ContentBlock) => void;
  onBlockSelect: (id: string) => void;
  onEditingBlockChange?: (id: string | null) => void;
  onFooterElementSelect?: (element: string | null) => void;
  onBlockDrop: (block: ContentBlock, sectionId: string, position?: number) => void;
  onMoveBlockWithinSection: (blockIndex: number, hoverIndex: number, sectionId: string) => void;
  onDuplicateBlock: (block: ContentBlock, sectionId: string, position: number) => void;
  onDeleteBlock: (blockId: string, sectionId: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onSectionUpdate: (section: EmailSection) => void;
}

export const SectionContainer: React.FC<SectionContainerProps> = ({
  section,
  selectedBlockId,
  editingBlockId,
  selectedFooterElement,
  onBlockUpdate,
  onBlockSelect,
  onEditingBlockChange,
  onFooterElementSelect,
  onBlockDrop,
  onMoveBlockWithinSection,
  onDuplicateBlock,
  onDeleteBlock,
  onDeleteSection,
  onSectionUpdate,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-white rounded"
          >
            <ChevronDown
              className={cn("w-4 h-4 transition-transform", !isExpanded && "-rotate-90")}
            />
          </button>
          <h3 className="font-medium text-sm">{section.name || "Section"}</h3>
          <span className="text-xs text-gray-500">({section.blocks.length})</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 hover:bg-red-50"
          onClick={() => onDeleteSection(section.id)}
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </Button>
      </div>

      {/* Section Content */}
      {isExpanded && (
        <div className="p-4">
          {section.blocks.length === 0 ? (
            <SectionDropZone
              sectionId={section.id}
              position={0}
              onBlockDrop={onBlockDrop}
              isEmpty={true}
            />
          ) : (
            <div className="space-y-2">
              <SectionDropZone
                sectionId={section.id}
                position={0}
                onBlockDrop={onBlockDrop}
                isEmpty={false}
              />

              {section.blocks.map((block, index) => (
                <React.Fragment key={block.id}>
                  <DraggableBlock
                    block={block}
                    index={index}
                    totalBlocks={section.blocks.length}
                    isSelected={selectedBlockId === block.id}
                    isEditing={editingBlockId === block.id}
                    selectedFooterElement={selectedFooterElement}
                    onBlockUpdate={onBlockUpdate}
                    onBlockSelect={onBlockSelect}
                    onEditingBlockChange={onEditingBlockChange}
                    onFooterElementSelect={onFooterElementSelect}
                    onMoveBlock={(dragIndex, hoverIndex) =>
                      onMoveBlockWithinSection(dragIndex, hoverIndex, section.id)
                    }
                    onAddBlock={(newBlock, position) =>
                      onBlockDrop(newBlock, section.id, position)
                    }
                    onDuplicate={(dupBlock, position) =>
                      onDuplicateBlock(dupBlock, section.id, position)
                    }
                    onDelete={(blockId) => onDeleteBlock(blockId, section.id)}
                  />

                  <SectionDropZone
                    sectionId={section.id}
                    position={index + 1}
                    onBlockDrop={onBlockDrop}
                    isEmpty={false}
                  />
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
