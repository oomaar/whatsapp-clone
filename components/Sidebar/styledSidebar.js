import { Avatar, Button } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled.div`
    flex: 0.45;
    border-right: 1px solid whitesmoke;
    height: 100vh;
    min-width: 300px;
    max-width: 350px;
    overflow-y: scroll;
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    ::-webkit-scrollbar {
        display: none; /* Chrome  */
    }
`;

export const Header = styled.div`
    display: flex;
    position: sticky;
    top: 0;
    background-color: #fff;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    height: 80px;
    border-bottom: 1px solid whitesmoke;
`;

export const UserAvatar = styled(Avatar)`
    cursor: pointer;

    :hover {
        opacity: 0.8;
    }
`;

export const IconsContainer = styled.div`
    position: relative;
`;

export const Search = styled.div`
    display: flex;
    align-items: center;
    padding: 20px;
    border-radius: 2px;
`;

export const SearchInput = styled.input`
    outline: none;
    border: none;
    flex: 1;
    font-size: 0.9rem;
`;

export const SidebarButton = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
    }
`;

export const MoreContainer = styled.div`
    box-shadow: 0px 4px 14px -3px rgba(0, 0, 0, 0.7);
    position: absolute;
    padding: 20px;
    border-radius: 10px;
    background-color: whitesmoke;
`;

export const SignOutLink = styled(Button)`
    width: 100%;

    &&& {
        border-top: 1px solid whitesmoke;
        border-bottom: 1px solid whitesmoke;
        font-size: 12px;
        padding: 0;
    }
`;