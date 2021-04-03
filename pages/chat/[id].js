import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { ChatScreen, Sidebar } from "../../components";
import HeadTag from "../../HeadTag";
import { auth, db } from "../../lib/firebase";
import { getRecipientEmail } from "../../utils/getRecipientEmail";

const Chat = ({ chat, messages }) => {
    const [user] = useAuthState(auth);
    
    return (
        <Container>
            <HeadTag title={`Chat with ${getRecipientEmail(chat.users, user)}`} />
            <Sidebar />
            <ChatContainer>
                <ChatScreen chat={chat} messages={messages} />
            </ChatContainer>
        </Container>
    );
};

export default Chat;

export async function getServerSideProps(context) {
    const ref = db.collection("chats").doc(context.query.id);

    // PREP the messages on the server
    const messagesRef = 
    await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();
    const messages = messagesRef.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }))
    .map(messages => ({
        ...messages,
        timestamp: messages.timestamp.toDate().getTime()
    }));
    
    // PREP the chats on the server
    const chatRes = await ref.get();
    const chat = {
        id: chatRes.id,
        ...chatRes.data()
    }

    return {
        props: {
            messages: JSON.stringify(messages),
            chat: chat,
        }
    }
}

const Container = styled.div`
    display: flex;
`;

const ChatContainer = styled.div`
    overflow: scroll;
    flex: 1;
    height: 100vh;
    -ms-overflow-style: none;
    scrollbar-width: none;

    ::-webkit-scrollbar {
        display: none;
    }
`;