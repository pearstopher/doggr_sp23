import { httpClient } from "@/Services/HttpClient.tsx";

export const MessageService = {
	async send(sender_id: number, receiver_id: number) {
		return httpClient.post("/messages", { sender_id, passee_id: receiver_id });
	},
};
