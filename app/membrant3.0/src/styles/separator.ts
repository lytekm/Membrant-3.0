/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const separator = (margin : string = 'md') => css`
    width: 100%;
    height: 1px;
    background-color: var(--color-border);
    margin: var(--space-${margin}) 0;
`;

export default separator;