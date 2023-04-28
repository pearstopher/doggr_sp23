export type ICreateUsersBody = {
	name: string,
	email: string,
	petType: string
}

export type ICreateMessagesBody = {
	sender: string,
	receiver: string,
	message: string
}
