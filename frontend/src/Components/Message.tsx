import { Profile } from "@/Components/Profile.tsx";
import { ProfileType } from "@/DoggrTypes.ts";
import { useAuth } from "@/Services/Auth.tsx";
import { getNextProfileFromServer } from "@/Services/HttpClient.tsx";
import { MatchService } from "@/Services/MatchService.tsx";
import { PassService } from "@/Services/PassService.tsx";
import { MessageService } from "@/Services/MessageService.tsx";
import { useContext, useEffect, useState } from "react";

export const Message = () => {
	const [currentProfile, setCurrentProfile] = useState<ProfileType>();

	const auth = useAuth();

	const fetchProfile = () => {
		getNextProfileFromServer()
			.then((response) => setCurrentProfile(response))
			.catch((err) => console.log("Error in fetch profile", err));
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	const onLikeButtonClick = () => {
		MatchService.send(auth.userId, currentProfile.id)
			.then(fetchProfile)
			.catch((err) => {
				console.error(err);
				fetchProfile();
			});
	};

	const onPassButtonClick = () => {
		PassService.send(auth.userId, currentProfile.id)
			.then(fetchProfile)
			.catch((err) => {
				console.error(err);
				fetchProfile();
			});
	};

	const onMessageButtonClick = () => {
		const message = "sample message string";
		MessageService.send(auth.userId, currentProfile.id, message)
			.then(fetchProfile)
			.catch((err) => {
				console.error(err);
				fetchProfile();
			});
	};

	const profile = (
		<Profile
			{...currentProfile}
			onLikeButtonClick={onLikeButtonClick}
			onPassButtonClick={onPassButtonClick}
			onMessageButtonClick={onMessageButtonClick}
		/>
	);

	return <>{profile}</>;
};
