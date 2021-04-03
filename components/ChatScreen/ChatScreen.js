import { Avatar } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../lib/firebase";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { IconButton } from '@material-ui/core';
import { useCollection } from "react-firebase-hooks/firestore";
import {
    Container,
    Header,
    HeaderInfo,
    HeaderIcons,
    MessageContainer,
    EndOfMessage,
} from "./styledChatScreen";
import { Message } from "..";

const ChatScreen = () => {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
        .collection("users")
        .doc(router.query.id)
        .collection("messages")
        .orderBy("timestamp", "asc")
    );

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ))
        } 
    };

    return (
        <Container>
            <Header>
                <Avatar />

                <HeaderInfo>
                    <h3>Recipient Email</h3>
                    <p>Last Seen...</p>
                </HeaderInfo>
                <HeaderIcons>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                <EndOfMessage />
            </MessageContainer>
        </Container>
    );
};

export default ChatScreen;
