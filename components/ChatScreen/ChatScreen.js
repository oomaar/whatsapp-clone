import firebase from "firebase";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { Avatar } from "@material-ui/core";
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { IconButton } from '@material-ui/core';
import TimeAgo from "timeago-react";
import { Message } from "..";
import { auth, db } from "../../lib/firebase";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import {
    Container,
    Header,
    HeaderInfo,
    HeaderIcons,
    MessageContainer,
    EndOfMessage,
    InputContainer,
    Input,
} from "./styledChatScreen";

const ChatScreen = ({ chat, messages }) => {
    const [input, setInput] = useState();
    const [user] = useAuthState(auth);
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );

    const [recipientSnapshot] = useCollection(
        db
            .collection("users")
            .where("email", "==", getRecipientEmail(chat.users, user))
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
        } else {
            return JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                />
            ))
        }
    };

    const sendMessage = e => {
        e.preventDefault();
        db
            .collection("users")
            .doc(user.uid)
            .set({
                lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
            }, { merge: true });

        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .add({
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user.email,
                photoURL: user.photoURL
            });

        setInput("");
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} alt="Photo" />
                ) : (
                    <Avatar src={recipientEmail[0]} alt="Photo" />
                )}

                <HeaderInfo>
                    <h3>{recipientEmail}</h3>
                    {recipientSnapshot ? (
                        <p>
                            Last active: {' '}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : "Unavailable"}
                        </p>
                    ) : (
                        <p>Loading Last Active...</p>
                    )}
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
                {showMessages()}
                <EndOfMessage />
            </MessageContainer>
            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button
                    hidden
                    disabled={!input}
                    type="submit"
                    onClick={sendMessage}
                >
                    Send Message
                </button>
                <MicIcon />
            </InputContainer>
        </Container>
    );
};

export default ChatScreen;
