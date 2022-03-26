import { createGlobalStyle } from 'styled-components';
import { backgroundColor } from '../design/@generated/themes';

export const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;

        background-color: {backgroundColor};
    }
`;
