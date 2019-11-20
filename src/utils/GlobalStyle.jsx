import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
*{
  box-sizing: border-box;
  &:focus{
    outline: solid thin var(--color-focus);
  }
}
:root{
  --color-brand-1: #bada55;
  --color-brand-2: #bada55;
  --color-brand-3: #bada55;
  --color-brand-4: #bada55;
  --color-brand-5: #bada55;
  --color-bg: #fff;
  --color-fg: #222;
  --color-selection: #ddd;
  --color-link: #2f65c7;
  --color-focus: #748fc1;
  --color-highlight: #748fc1;
  --color-error: #BC1717;
  --color-success: #F5F5F8;
  --color-warning: #E06811;
  --font-primary: system-ui, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  --font-secondary: 'Titillium Web', sans-serif;
  --font-tertiary: 'Bebas Neue', cursive;
  --round-radius-1: 1.5rem;
  --round-radius-2: 4rem;
  --drop-shadow-1: .1rem .1rem .2rem rgba(0, 0, 0, .05);
  --drop-shadow-2: 0 .1rem .2rem rgba(0, 0, 0, .3);
  --animation-easing: cubic-bezier(.5, 0, .5, 1);
  --site-width: 1200px;
  font-size: 62.5%;
  width: 100%;
  scroll-behavior: smooth;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  @media (prefers-color-scheme: dark) {
    --color-bg: #222;
    --color-fg: #eee;
    --color-link: #2f65c7;
    --color-focus: #748fc1;
    --color-highlight: #748fc1;
    --color-selection: #444;
  }
}
body{
  width: 100%;
  margin: 0;
  background: var(--color-bg);
  color: var(--color-fg);
  font: 1.6rem/1.5 var(--font-primary);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
::selection{
  background: var(--color-highlight);
}
a{
  text-decoration: none;
  background-color: transparent;
  color: var(--color-link);
}
img{
  max-width: 100%;
  border-style: none;
}
button, input, select, textarea{
  font: inherit;
}
main{
  display: block;
}
`;

export default GlobalStyle;