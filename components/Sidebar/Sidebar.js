import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import {
    Container,
    Header,
    UserAvatar,
    IconsContainer,
    Search,
    SearchInput,
    SidebarButton,
} from "./styledSidebar";

const Sidebar = () => {
    const createChat = () => {
        const input = prompt('Please enter an email addres for the user you want to chat with');

        if (!input) return null;

        if (EmailValidator.validate(input)) {
            // Push the chat to the database 'chats' collection
        };
    };

    return (
        <Container>
            <Header>
                <UserAvatar />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
            {/* List Of Chats Goes Here */}
        </Container>
    );
};

export default Sidebar;
