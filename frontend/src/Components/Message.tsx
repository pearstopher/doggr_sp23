import { Profile } from "@/Components/Profile.tsx";
import { MessageProfile } from "@/Components/MessageProfile.tsx";
import { ProfileType } from "@/DoggrTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { MatchService } from "@/Services/MatchService.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { MessageService } from "@/Services/MessageService.tsx";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Message = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();

	const auth = useAuth();
	const { sender, receiver } = useParams();
	console.log(sender);
	console.log(receiver);

	const fetchProfile = () => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch((err) => console.log("Error in fetch profile", err));
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const messageSent = () => {};

	const onMessageButtonClick = () => {
		const message = "sample message string";
		MessageService.send(auth.userId, currentProfile.id, message)
			.then(messageSent)
			.catch((err) => {
				console.error(err);
				messageSent();
			});
	};

	const profile = (
		<MessageProfile {...currentProfile} onMessageButtonClick={onMessageButtonClick} />
	);

	return <>{profile}</>;
};
