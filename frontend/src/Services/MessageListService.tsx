import { httpClient } from "@/Services/HttpClient.tsx";

export const MessageListService = {
	async sent(id: number) {
		return httpClient.post("/messages/sent", { sender_id: id });
	},
	async received(id: number) {
		return httpClient.post("/messages/received", { receiver_id: id });
	},
};
