import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
*{
box-sizing: border-box !important;
color:${(props) => props.theme.colors.text};
font-family:${(props) => props.theme.fonts.main}
};

h1,h2,h3{
    color:${(props) => props.theme.colors.main};
    font-family:${(props) => props.theme.fonts.second};
    font-weight: 400;
};
`;
