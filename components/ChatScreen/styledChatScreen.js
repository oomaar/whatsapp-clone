import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
    position: sticky;
    background-color: #fff;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

export const HeaderInfo = styled.div`
    margin-left: 15px;
    flex: 1;

    h3 {
        margin-bottom: 3px;
    }

    p {
        font-size: 14px;
        color: gray;
    }
`;

export const HeaderIcons = styled.div``;

export const MessageContainer = styled.div`
    padding: 30px;
    background-color: #e5ded8;
    min-height: 90vh;
`;

export const EndOfMessage = styled.div`
    margin-bottom: 50px;
`;

export const InputContainer = styled.form`
    display: flex;
    align-items: center;
    padding: 10px;
    position: sticky;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
`;

export const Input = styled.input`
    flex: 1;
    background-color: whitesmoke;
    outline: 0;
    border: 0;
    border-radius: 10px;
    padding: 20px;
    margin: 0 15px;
    font-size: 1rem;
`;