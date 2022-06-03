import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';
import 'react-toastify/dist/ReactToastify.css';

import background from '../assets/images/background.svg';

export default createGlobalStyle`
  :root {
    --base-color: #191920;
    --highlight-color: #7159C1;
    --dark-color: #333;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background: var(--highlight-color);
    -webkit-box-shadow: inset 1px 1px 2px rgb(155 155 155 / 40%);
    -moz-box-shadow: inset 1px 1px 2px rgba(155, 155, 155, 0.4);
    box-shadow: inset 1px 1px 2px rgb(155 155 155 / 40%);
    border-radius: 4px;
    &:hover {
      background: ${darken(0.06, '#7159c1')};
    }
  }

  ::-webkit-scrollbar-track {
    background: #fff;
    -webkit-box-shadow: inset 1px 1px 2px #e0e0e0;
    -moz-box-shadow: inset 1px 1px 2px #e0e0e0;
    box-shadow: inset 1px 1px 2px #e0e0e0;
    border: 1px solid #d8d8d8;
  }

  ::selection {
    background: var(--highlight-color);
    color: #fff;
  }

  body {
    background: var(--base-color) url(${background}) no-repeat center top;
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px Roboto, sans-serif;
  }

  #root {
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px 50px;
  }

  button {
    cursor: pointer;
  }
`;
