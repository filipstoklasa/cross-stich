import { type ChangeEvent, type PropsWithChildren, useRef } from "react";
import { Button } from "@chakra-ui/react";

interface FileButtonProps {
  onChange: (file: File) => void;
  accept?: string;
  testId?: string;
}

export const FileButton = ({
  children,
  accept,
  testId,
  onChange,
}: PropsWithChildren<FileButtonProps>) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onInputClick = () => {
    inputRef.current?.click();
  };

  const onInputChange = ({
    target: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    files?.[0] && onChange(files[0]);
  };

  return (
    <>
      <Button onClick={onInputClick}>{children}</Button>
      <input
        data-testid={testId || "file-input"}
        ref={inputRef}
        hidden
        type="file"
        onChange={onInputChange}
        accept={accept}
      />
    </>
  );
};
