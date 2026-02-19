"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2, GripVertical } from "lucide-react";

type ContentBlock =
    | { type: "paragraph"; text: string }
    | { type: "heading"; text: string; id: string }
    | { type: "list"; items: string[] }
    | { type: "callout"; variant: string; title: string; text: string }
    | { type: "code"; language: string; code: string };

type ContentEditorProps = {
    value: ContentBlock[];
    onChange: (blocks: ContentBlock[]) => void;
};

function createBlock(type: string): ContentBlock {
    switch (type) {
        case "heading":
            return { type: "heading", text: "", id: "" };
        case "list":
            return { type: "list", items: [""] };
        case "callout":
            return { type: "callout", variant: "info", title: "", text: "" };
        case "code":
            return { type: "code", language: "bash", code: "" };
        default:
            return { type: "paragraph", text: "" };
    }
}

function BlockEditor({
    block,
    index,
    onChange,
    onRemove,
}: {
    block: ContentBlock;
    index: number;
    onChange: (block: ContentBlock) => void;
    onRemove: () => void;
}) {
    return (
        <div className="group relative rounded-lg border border-vd-border bg-vd-bg-secondary p-4">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <GripVertical className="h-4 w-4 text-vd-text-secondary cursor-grab" />
                    <span className="rounded bg-vd-bg-tertiary px-2 py-0.5 text-xs font-medium text-vd-text-secondary uppercase">
                        {block.type}
                    </span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onRemove}
                    className="h-7 w-7 text-vd-text-secondary hover:text-red-400"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>

            {block.type === "paragraph" && (
                <Textarea
                    placeholder="Paragraph text..."
                    value={block.text}
                    onChange={(e) => onChange({ ...block, text: e.target.value })}
                    className="min-h-[80px] border-vd-border bg-vd-bg-primary"
                />
            )}

            {block.type === "heading" && (
                <div className="space-y-2">
                    <Input
                        placeholder="Heading text"
                        value={block.text}
                        onChange={(e) => onChange({ ...block, text: e.target.value })}
                        className="border-vd-border bg-vd-bg-primary font-semibold"
                    />
                    <Input
                        placeholder="Anchor ID (e.g. introduction)"
                        value={block.id}
                        onChange={(e) => onChange({ ...block, id: e.target.value })}
                        className="border-vd-border bg-vd-bg-primary text-sm"
                    />
                </div>
            )}

            {block.type === "list" && (
                <div className="space-y-2">
                    {block.items.map((item, i) => (
                        <div key={i} className="flex gap-2">
                            <Input
                                placeholder={`Item ${i + 1}`}
                                value={item}
                                onChange={(e) => {
                                    const newItems = [...block.items];
                                    newItems[i] = e.target.value;
                                    onChange({ ...block, items: newItems });
                                }}
                                className="border-vd-border bg-vd-bg-primary"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    const newItems = block.items.filter((_, j) => j !== i);
                                    onChange({ ...block, items: newItems.length > 0 ? newItems : [""] });
                                }}
                                className="h-9 w-9 shrink-0 text-vd-text-secondary hover:text-red-400"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>
                    ))}
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onChange({ ...block, items: [...block.items, ""] })}
                        className="text-vd-accent"
                    >
                        <Plus className="mr-1 h-3.5 w-3.5" />
                        Add item
                    </Button>
                </div>
            )}

            {block.type === "callout" && (
                <div className="space-y-2">
                    <Select
                        value={block.variant}
                        onValueChange={(v) => onChange({ ...block, variant: v })}
                    >
                        <SelectTrigger className="w-40 border-vd-border bg-vd-bg-primary">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="info">ℹ️ Info</SelectItem>
                            <SelectItem value="tip">💡 Tip</SelectItem>
                            <SelectItem value="warning">⚠️ Warning</SelectItem>
                            <SelectItem value="danger">🚨 Danger</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input
                        placeholder="Callout title"
                        value={block.title}
                        onChange={(e) => onChange({ ...block, title: e.target.value })}
                        className="border-vd-border bg-vd-bg-primary"
                    />
                    <Textarea
                        placeholder="Callout text..."
                        value={block.text}
                        onChange={(e) => onChange({ ...block, text: e.target.value })}
                        className="min-h-[60px] border-vd-border bg-vd-bg-primary"
                    />
                </div>
            )}

            {block.type === "code" && (
                <div className="space-y-2">
                    <Input
                        placeholder="Language (bash, typescript, etc.)"
                        value={block.language}
                        onChange={(e) => onChange({ ...block, language: e.target.value })}
                        className="w-48 border-vd-border bg-vd-bg-primary text-sm"
                    />
                    <Textarea
                        placeholder="Code..."
                        value={block.code}
                        onChange={(e) => onChange({ ...block, code: e.target.value })}
                        className="min-h-[120px] border-vd-border bg-vd-bg-primary font-mono text-sm"
                    />
                </div>
            )}
        </div>
    );
}

export function ContentEditor({ value, onChange }: ContentEditorProps) {
    const [addType, setAddType] = useState("paragraph");

    function updateBlock(index: number, block: ContentBlock) {
        const newBlocks = [...value];
        newBlocks[index] = block;
        onChange(newBlocks);
    }

    function removeBlock(index: number) {
        onChange(value.filter((_, i) => i !== index));
    }

    function addBlock() {
        onChange([...value, createBlock(addType)]);
    }

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-vd-text-primary">
                Content Blocks
            </Label>

            {value.map((block, i) => (
                <BlockEditor
                    key={i}
                    block={block}
                    index={i}
                    onChange={(b) => updateBlock(i, b)}
                    onRemove={() => removeBlock(i)}
                />
            ))}

            {/* Add block controls */}
            <div className="flex items-center gap-2">
                <Select value={addType} onValueChange={setAddType}>
                    <SelectTrigger className="w-40 border-vd-border bg-vd-bg-primary">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="paragraph">Paragraph</SelectItem>
                        <SelectItem value="heading">Heading</SelectItem>
                        <SelectItem value="list">List</SelectItem>
                        <SelectItem value="callout">Callout</SelectItem>
                        <SelectItem value="code">Code</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant="outline"
                    onClick={addBlock}
                    className="border-vd-border"
                >
                    <Plus className="mr-1 h-4 w-4" />
                    Add Block
                </Button>
            </div>
        </div>
    );
}
