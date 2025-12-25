"use client";

import { ContentState, convertToRaw } from "draft-js";
import { AnyObject } from "yup";

export const trimFields = <T extends AnyObject>(values: T): T => {
  const trimmedValues = {} as any;
  Object.keys(values).forEach((key) => {
    trimmedValues[key] =
      typeof values[key] === "string" ? values[key].trim() : values[key];
  });
  return trimmedValues;
};

export const isValidSize = (file: File, maxSize: number) => {
  return file.size <= maxSize * 1024 * 1024;
};

export const formatFileSize = (sizeInBytes: number) => {
  return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
};

export function generateRandomId() {
  return (
    "id-" +
    Math.random().toString(36).substr(2, 9) +
    "-" +
    Date.now().toString(36)
  );
}

export const truncateFileName = (fileName: string) => {
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));
  const nameWithoutExtension = fileName.substring(0, fileName.lastIndexOf("."));
  if (nameWithoutExtension.length > 10) {
    const firstPart = nameWithoutExtension.substring(0, 3);
    const lastPart = nameWithoutExtension.substring(
      nameWithoutExtension.length - 3,
    );
    return `${firstPart}...${lastPart}${fileExtension}`;
  }
  return fileName;
};

export const isEditorContentEmpty = async (editorState?: string | null) => {
  if (!editorState) return true;

  const htmlToDraft = (await import("html-to-draftjs")).default;

  const contentBlock = htmlToDraft(editorState);
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks,
    );
    const rawContent = convertToRaw(contentState);

    // Check if there is any non-empty text
    const hasText = rawContent.blocks.some((block) => block.text.trim() !== "");

    // Check if there are any images
    const hasImage = /<img\s[^>]*src=/.test(editorState);

    return !(hasText || hasImage);
  }

  return true;
};
