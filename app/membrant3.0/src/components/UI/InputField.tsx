/** @jsxImportSource @emotion/react */
import React from 'react';
import { css } from '@emotion/react';
import {
  textInput,
  numberInput,
  dateInput,
  selectInput,
} from '@/styles/inputStyles';

const labelCss = css`
  display: block;
  font-size: var(--small-size);
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: var(--space-xs);
`;

const descriptionCss = css`
  font-size: var(--small-size);
  color: var(--color-text-secondary);
  margin-top: var(--space-xs);
`;

const errorCss = css`
  font-size: var(--small-size);
  color: var(--color-danger);
  margin-top: var(--space-xs);
`;

const fieldWrapper = css`
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  width: 100%;
`;

type InputFieldProps = {
  type: 'text' | 'number' | 'date' | 'select' | 'text-area';
  name: string;
  label?: string;
  description?: string;
  error?: string;
  value?: string | number;
  options?: { value: string; label: string }[]; // only for select
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  inputCss?: any;
};

export const InputField = ({
  type,
  name,
  label,
  description,
  error,
  value,
  options,
  onChange,
  placeholder,
  inputCss,
}: InputFieldProps) => {
  const getInputStyle = () => {
    switch (type) {
      case 'number':
        return numberInput;
      case 'date':
        return dateInput;
      case 'select':
        return selectInput;
      case 'text':
        return textInput;
      case 'text-area':
        return textInput;
      default:
        return textInput;
    }
  };

  const baseInputStyle = css`
    ${getInputStyle()}
    ${inputCss}
    ${error &&
    css`
      border-color: var(--color-danger);
    `}
  `;

return (
  <div css={fieldWrapper}>
      {label && <label htmlFor={name} css={labelCss}>{label}</label>}

      {type === 'select' ? (
        <select
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          css={baseInputStyle}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === 'text-area' ? (
        <textarea
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          css={css`
            ${baseInputStyle};
            resize: vertical;
            min-height: 100px;
            line-height: 1.5;
          `}
        />
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          css={baseInputStyle}
        />
      )}

      {description && !error && <p css={descriptionCss}>{description}</p>}
      {error && <p css={errorCss}>{error}</p>}
    </div>
  );
};
