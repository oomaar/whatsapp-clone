import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import { getRecipientEmail } from "../../utils/getRecipientEmail";
import {
    Container,
    UserAvatar,
} from "./styledChat";

const Chat = ({ id, users }) => {
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);

    return (
        <Container>
            <UserAvatar />
            <p>{recipientEmail}</p>
        </Container>
    );
};

export default Chat;
