import styled from "styled-components";

export const Container = styled.div``;

export const MessageElement = styled.p`
    width: fit-content;
    padding: 15px 15px 26px;
    border-radius: 8px;
    margin: 10px;
    min-width: 60px;
    position: relative;
    text-align: right;
`;

export const Sender = styled(MessageElement)`
    margin-left: auto;
    background-color: #dcf8c6;
`;

export const Reciever = styled(MessageElement)`
    background-color: whitesmoke;
    text-align: left;
`;

export const TimeStamp = styled.span`
    color: gray;
    padding: 10px;
    font-size: 10px;
    position: absolute;
    bottom: 0;
    text-align: right;
    right: 0;
`;