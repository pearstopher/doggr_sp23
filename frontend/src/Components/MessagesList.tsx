import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "@/Services/Auth.tsx";
import { Link, Route, Routes } from "react-router-dom";
import { MessageService } from "@/Services/MessageService.tsx";
import { MessageListService } from "@/Services/MessageListService.tsx";

// 1) Make a place to store the users list result
// 2) Make the actual request to backend and store result
// 3) Show the list of users formatted nicely in our webpage
export const MessagesList = () => {
	const [sentMessages, setSentMessages] = useState([]);
	const [receivedMessages, setReceivedMessages] = useState([]);
	const auth = useAuth();

	const minioUrl = "http://localhost:9000/doggr/";

	const displaySentMessages = (messages) => {
		console.log(messages);
		setSentMessages(messages.data);
	};
	const displayReceivedMessages = (messages) => {
		console.log(messages);
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
			<h2>Received Messages:</h2>
			{receivedMessages ? (
				<ul>
					{/*{receivedMessages.map(*/}
					{/*	(receivedMessage: { sender: string; message: string; id: string; imgUri: string }) => (*/}
					{/*		<li key={receivedMessage.id}>*/}
					{/*			<img*/}
					{/*				className="rounded w-128 h-128"*/}
					{/*				src={minioUrl + receivedMessage.imgUri}*/}
					{/*				alt="Profile of pet"*/}
					{/*			/>{" "}*/}
					{/*			{receivedMessage.sender} - {receivedMessage.message}{" "}*/}
					{/*			<Link to={`/message/${auth.userId}/${receivedMessage.sender}`}>Message</Link>*/}
					{/*		</li>*/}
					{/*	)*/}
					{/*)}*/}
					{/*JSON.stringify(receivedMessages)*/}
					{receivedMessages.map((object, i) => (
						<li key={object.id}>
							<img
								className={"rounded w-128 h-128"}
								src={minioUrl + object.imgUri}
								alt="Profile of pet"
							/>
							{object.sender.name} - {object.message}{" "}
							<Link to={`/message/${auth.userId}/${object.sender.id}`}>Message</Link>
						</li>
					))}
				</ul>
			) : null}
			<h2>Sent Messages:</h2>
			{sentMessages ? (
				<ul>
					{sentMessages.map(
						(sentMessage: { receiver: string; message: string; id: string; imgUri: string }) => (
							<li key={sentMessage.id}>
								<img
									className="rounded w-128 h-128"
									src={minioUrl + sentMessage.imgUri}
									alt="Profile of pet"
								/>{" "}
								{sentMessage.receiver} - {sentMessage.message}{" "}
								<Link to={`/message/${auth.userId}/${sentMessage.receiver}`}>Reply</Link>
							</li>
						)
					)}
				</ul>
			) : null}
		</div>
	);
};
