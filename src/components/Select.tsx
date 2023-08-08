import { Select as ChakraSelect } from "@chakra-ui/react";
import type { ChangeEvent } from "react";
import { withLabel } from "./utils/withLabel";

type Value = string | number;

interface SelectItem {
  name: Value;
  value: Value;
}

export interface SelectProps {
  value: Value;
  options: SelectItem[];
  onChange: (value: Value) => void;
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
        {options.map(({ name, value }) => (
          <option key={value} value={value}>
            {name}
          </option>
        ))}
      </ChakraSelect>
    );
  }
);
