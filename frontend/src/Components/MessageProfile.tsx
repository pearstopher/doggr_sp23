import { ProfileType } from "@/DoggrTypes.ts";
import { useEffect, useState } from "react";
import "@css/DoggrStyles.css";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";

export type ProfileProps = ProfileType & {
	onMessageButtonClick: () => void;
	messageText: string;
	setMessageText: (messageText: string) => void;
};

export function MessageProfile(props: ProfileProps) {
	const { imgUri, name, petType, messageText, setMessageText, onMessageButtonClick } = props;

	const minioUrl = "http://localhost:9000/doggr/" + imgUri;

	return (
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<img className="rounded w-128 h-128" src={minioUrl} alt="Profile of pet" />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"text-2xl text-blue-300"}>Pet Type: {petType}</div>
			<textarea
				id={"messageText"}
				value={messageText}
				onChange={(e) => {
					setMessageText(e.target.value);
				}}></textarea>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={onMessageButtonClick}>
					Message
				</button>
			</div>
		</div>
	);
}
