import { ProfileType } from "@/DoggrTypes.ts";
import axios from "axios";

const serverIP = import.meta.env.API_HOST;
const serverPort = import.meta.env.PORT;

const serverUrl = `http://localhost:8080`;

// This is why I use Axios over Fetch
export const httpClient = axios.create({
	baseURL: serverUrl,
	headers: {
		"Content-type": "application/json",
	},
});

export async function getNextProfileFromServer() {
	const profile = await httpClient.get<ProfileType>("/profile");
	return profile.data;
}

export async function getThisProfileFromServer(id) {
	const profile = await httpClient.get<ProfileType>(`/profile/${id}`);
	return profile.data;
}
