import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/Services/Auth.tsx";
import { MessageService } from "@/Services/MessageService.tsx";
import { MessageListService } from "@/Services/MessageListService.tsx";

// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage
export const MessagesList = () => {
	const [users, setUsers] = useState([]);
	const auth = useAuth();

	const displayMessages = (messages) => {
		console.log(messages);
	};

	const getMessageList = () => {
		MessageListService.sent(auth.userId)
			.then(displayMessages)
			.catch((err) => {
				console.error(err);
				displayMessages(err);
			});

		MessageListService.received(auth.userId)
			.then(displayMessages)
			.catch((err) => {
				console.error(err);
				displayMessages(err);
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
			<h2>Users:</h2>
			{users ? (
				<ul>
					{users.map((user: { email: string; name: string }) => (
						<li key={user.email}>
							{" "}
							{user.name} - {user.email}{" "}
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
