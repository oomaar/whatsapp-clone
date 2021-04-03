import moment from "moment";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../lib/firebase";
import {
    Container,
    MessageElement,
    Sender,
    Reciever,
    TimeStamp,
} from "./styledMessage";

const Message = ({ user, message }) => {
    const [userLoggedIn] = useAuthState(auth);
    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage>
                {message.message}
                <TimeStamp>
                    {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
                </TimeStamp>
            </TypeOfMessage>
        </Container>
    );
};

export default Message;
