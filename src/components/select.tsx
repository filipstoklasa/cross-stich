import { Select as ChakraSelect } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { withLabel } from "./utils/with-label";

type SelectValue = string | number;

interface SelectItem {
  key: string | number;
  value: SelectValue;
}

export interface SelectProps {
  value: SelectValue;
  options: SelectItem[];
  onChange: (value: SelectValue) => void;
  testId?: string;
}

export const Select = withLabel(
  ({ value, options, onChange, testId }: SelectProps) => {
    const onSelectChange = ({
      target: { value },
    }: ChangeEvent<HTMLSelectElement>) => onChange(value);

    return (
      <ChakraSelect
        data-testid={testId}
        onChange={onSelectChange}
        value={value}
      >
        {options.map(({ key, value }) => (
          <option key={value} value={value}>
            {key}
          </option>
        ))}
      </ChakraSelect>
    );
  }
);
