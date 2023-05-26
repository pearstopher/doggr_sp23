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
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<h2>Received Messages:</h2>
			{receivedMessages ? (
				<ul className={"grid grid-cols-2 space-y-4 space-x-4"}>
					<span className={"hidden"}></span>{" "}
					{/* the spacing isn't getting applied to the first item */}
					{receivedMessages.map((message, i) => (
						<li className={"flex flex-wrap space-x-4 space-y-4 bg-blue-900"} key={message.id}>
							<img
								className={"rounded w-1/8"}
								src={minioUrl + message.imgUri}
								alt="Profile of pet"
							/>
							<span className={"w-7/8 text-2xl"}>{message.name}</span>
							<div className={"w-full"}> {message.message}</div>
							<Link
								className={"w-full mb-10 text-right p-2"}
								to={`/message/${auth.userId}/${message.sender}`}>
								Reply
							</Link>
						</li>
					))}
				</ul>
			) : null}
			<h2>Sent Messages:</h2>
			{sentMessages ? (
				<ul className={"grid grid-cols-2 space-y-4 space-x-4"}>
					<span className={"hidden"}></span>{" "}
					{/* the spacing isn't getting applied to the first item */}
					{sentMessages.map((message, i) => (
						<li className={"flex flex-wrap space-x-4 space-y-4 bg-blue-900"} key={message.id}>
							<img
								className={"rounded w-1/8"}
								src={minioUrl + message.imgUri}
								alt="Profile of pet"
							/>
							<span className={"w-7/8 text-2xl"}>{message.name}</span>
							<div className={"w-full"}> {message.message}</div>
							<Link
								className={"w-full mb-10 text-right p-2"}
								to={`/message/${auth.userId}/${message.receiver}`}>
								Reply
							</Link>
						</li>
					))}
				</ul>
			) : null}
		</div>
	);
};
