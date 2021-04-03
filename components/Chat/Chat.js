import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../../lib/firebase";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import {
    Container,
    UserAvatar,
} from "./styledChat";

const Chat = ({ id, users }) => {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        db
        .collection("users")
        .where("email", "==", getRecipientEmail(users,user))
    );

    const enterChat = () => {
        router.push(`/chat/${id}`)
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(users, user);

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            <p>{recipientEmail}</p>
        </Container>
    );
};

export default Chat;
