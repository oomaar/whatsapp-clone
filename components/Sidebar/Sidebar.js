import { IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Chat } from '..';
import { auth, db } from "../../lib/firebase";
import {
    Container,
    Header,
    UserAvatar,
    IconsContainer,
    Search,
    SearchInput,
    SidebarButton,
    MoreContainer,
    SignOutLink,
} from "./styledSidebar";

const Sidebar = () => {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection("chats").where("users", "array-contains", user.email);
    const [chatsSnapshot] = useCollection(userChatRef);
    const [moreVert, setMoreVert] = useState(false);

    const createChat = () => {
        const input = prompt('Please enter an email addres for the user you want to chat with');

        const chatAlreadyExists = (recipientEmail) =>
            !!chatsSnapshot?.docs.find(chat =>
                chat
                    .data()
                    .users
                    .find(user => user === recipientEmail)?.length > 0
            );

        if (!input) return null;

        if (
            EmailValidator.validate(input) &&
            !chatAlreadyExists(input) &&
            input !== user.email
        ) {
            db
                .collection("chats")
                .add({ users: [user.email, input] });
        };
    };

    const handleMoreOptions = () => setMoreVert(state => !state);

    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon onClick={handleMoreOptions} />
                    </IconButton>
                    {moreVert && (
                        <MoreContainer>
                            <SignOutLink
                                onClick={() => auth.signOut()}
                                variant="outline"
                            >
                                Sign Out
                            </SignOutLink>
                        </MoreContainer>
                    )}
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>
            {chatsSnapshot?.docs.map(chat => (
                <Chat
                    key={chat.id}
                    id={chat.id}
                    users={chat.data().users}
                />
            ))}
        </Container>
    );
};

export default Sidebar;
