/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import {
  checkboxWrapper,
  hiddenCheckbox,
  customCheckbox,
} from "@/styles/inputStyles";

export const Checkbox = ({
  label,
  checked,
  onChange,
  ...props
}: {
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <label css={checkboxWrapper}>
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      css={hiddenCheckbox}
      {...props}
    />
    <span css={customCheckbox} />
    {label}
  </label>
);