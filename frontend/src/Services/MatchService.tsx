import { httpClient } from "@/Services/HttpClient.tsx";

export const MatchService = {
	async send(sender_id: number, receiver_id: number) {
		return httpClient.post("http://localhost:8080/match", {
			id: sender_id,
			matchee_id: receiver_id,
		});
	},
};
