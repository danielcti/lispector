import styled from 'styled-components/native';

export const Container = styled.View`
    flex: 1;
    padding: 30px 0;
    background: #fff;
    justify-content: center;
    align-items: center;
    border-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: black;
`;

export const Logo = styled.Image.attrs({
    source: require("../../assets/logo.png"),
    resizeMode: 'cover',
})`
    width: 197px;
    height: 40px;
`;