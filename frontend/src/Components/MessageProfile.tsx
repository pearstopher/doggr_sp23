import { ProfileType } from "@/DoggrTypes.ts";
import { useEffect } from "react";
import "@css/DoggrStyles.css";

export type ProfileProps = ProfileType & {
	onMessageButtonClick: () => void;
};

export function MessageProfile(props: ProfileProps) {
	const { imgUri, name, petType, onMessageButtonClick } = props;

	const minioUrl = "http://localhost:9000/doggr/" + imgUri;

	return (
		<div className={"flex flex-col items-center rounded-box bg-slate-700 w-4/5 mx-auto"}>
			<img className="rounded w-128 h-128" src={minioUrl} alt="Profile of pet" />
			<h2 className={"text-4xl text-blue-600"}>{name}</h2>
			<div className={"text-2xl text-blue-300"}>Pet Type: {petType}</div>
			<div className={"space-x-8 my-1"}>
				<button className="btn btn-circle" onClick={onMessageButtonClick}>
					Message
				</button>
			</div>
		</div>
	);
}
