import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/Services/Auth.tsx";
import { MessageService } from "@/Services/MessageService.tsx";
import { MessageListService } from "@/Services/MessageListService.tsx";

// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage
export const MessagesList = () => {
	const [sentMessages, setSentMessages] = useState([]);
	const [receivedMessages, setReceivedMessages] = useState([]);
	const auth = useAuth();

	const displaySentMessages = (messages) => {
		setSentMessages(messages.data);
	};
	const displayReceivedMessages = (messages) => {
		setReceivedMessages(messages.data);
	};

	const getMessageList = () => {
		MessageListService.sent(auth.userId)
			.then(displaySentMessages)
			.catch((err) => {
				console.error(err);
			});

		MessageListService.received(auth.userId)
			.then(displayReceivedMessages)
			.catch((err) => {
				console.error(err);
			});
	};

	useEffect(() => {
		// const getUsers = async () => {
		// 	const usersRes = await axios.get("http://localhost:8080/users");
		// 	return usersRes.data;
		// };
		//
		// getUsers().then(setUsers);
		getMessageList();
	}, []);

	return (
		<div>
			<h2>Sent Messages:</h2>
			{sentMessages ? (
				<ul>
					{sentMessages.map((sentMessage: { receiver: string; message: string }) => (
						<li key={sentMessage.receiver}>
							{" "}
							{sentMessage.receiver} - {sentMessage.message}{" "}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
