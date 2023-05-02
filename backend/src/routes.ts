import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import { Match } from "./db/entities/Match.js";
import {User} from "./db/entities/User.js";
import {Message} from "./db/entities/Message.js";
import {ICreateUsersBody, ICreateMessagesBody} from "./types.js";
import { containsBadWords } from "./badwords.js";

import * as fsPromise from 'fs/promises';


async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during routes construction");
	}
	
	app.get('/hello', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'helio';
	});
	
	app.get("/dbTest", async (request: FastifyRequest, reply: FastifyReply) => {
		return request.em.find(User, {});
	});
	

	
	// Core method for adding generic SEARCH http method
	// app.route<{Body: { email: string}}>({
	// 	method: "SEARCH",
	// 	url: "/users",
	//
	// 	handler: async(req, reply) => {
	// 		const { email } = req.body;
	//
	// 		try {
	// 			const theUser = await req.em.findOne(User, { email });
	// 			console.log(theUser);
	// 			reply.send(theUser);
	// 		} catch (err) {
	// 			console.error(err);
	// 			reply.status(500).send(err);
	// 		}
	// 	}
	// });

	// USERS

	// CRUD
	// C
	app.post<{Body: ICreateUsersBody}>("/users", async (req, reply) => {

		const { name, email, petType} = req.body;
		
		try {
			const newUser = await req.em.create(User, {
				name,
				email,
				petType
			});

			await req.em.flush();
			
			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user", err.message);
			return reply.status(500).send({message: err.message});
		}
	});
	
	//READ
	app.search("/users", async (req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});
	
	// UPDATE
	app.put<{Body: ICreateUsersBody}>("/users", async(req, reply) => {
		const { name, email, petType} = req.body;
		
		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;
		userToChange.petType = petType;
		
		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);
		
	});
	
	// DELETE
	app.delete<{ Body: {email}}>("/users", async(req, reply) => {
		const { email } = req.body;
		
		try {
			const theUser = await req.em.findOne(User, { email });



			//remove the user from their messages
			//(can just display "sender deleted their account" or something to receiver)
			//shouldn't be able to delete somebody else's messages by deleting your account
			const messagesToChange = await req.em.find(Message, { sender: theUser });

			for (const message of messagesToChange) {
				message.sender = null;
			}



			await req.em.remove(theUser).flush();
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});


	// MATCHES

	// CREATE MATCH ROUTE
	app.post<{Body: { email: string, matchee_email: string }}>("/match", async (req, reply) => {
		const { email, matchee_email } = req.body;

		try {
			// make sure that the matchee exists & get their user account
			const matchee = await req.em.findOne(User, { email: matchee_email });
			// do the same for the matcher/owner
			const owner = await req.em.findOne(User, { email });

			//create a new match between them
			const newMatch = await req.em.create(Match, {
				owner,
				matchee
			});

			//persist it to the database
			await req.em.flush();
			// send the match back to the user
			return reply.send(newMatch);
		} catch (err) {
			console.error(err);
			return reply.status(500).send(err);
		}

	});


	// MESSAGES

	app.get('/messages', async (request: FastifyRequest, reply: FastifyReply) => {
		return 'messages';
	});


	// CRUD
	// C
	app.post<{Body: ICreateMessagesBody}>("/messages", async (req, reply) => {
		const { sender, receiver, message } = req.body;

		const from_user = await req.em.findOne(User, { email:sender });
		const to_user = await req.em.findOne(User, { email:receiver });

		if (containsBadWords(message)) {
			return reply.status(500).send({message: "You are naughty."});
		}

		try {
			const newMessage = await req.em.create(Message, {
				sender:from_user,
				receiver:to_user,
				message
			});

			await req.em.flush();

			console.log("Created new message:", newMessage);
			return reply.send(newMessage);
		} catch (err) {
			console.log("Failed to create new message", err.message);
			return reply.status(500).send({message: err.message});
		}
	});

	//READ
	app.search("/messages", async (req, reply) => {
		const { receiver } = req.body;

		try {
			const user = await req.em.findOne(User, { email: receiver });
			const messages = await req.em.find(Message, { receiver:user });
			console.log(messages);
			reply.send(messages);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	app.search("/messages/sent", async (req, reply) => {
		const { sender } = req.body;

		try {
			const user = await req.em.findOne(User, { email: sender });
			const messages = await req.em.find(Message, { sender:user });
			console.log(messages);
			reply.send(messages);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	// UPDATE
	app.put<{Body: {messageId: number, message: string}}>("/messages", async(req, reply) => {
		const { messageId, message} = req.body;

		if (containsBadWords(message)) {
			return reply.status(500).send({message: "You are naughty."});
		}

		const messageToChange = await req.em.findOne(Message, { id: messageId });

		messageToChange.message = message;

		// Reminder -- this is how we persist our JS object changes to the database itself
		await req.em.flush();
		console.log(messageToChange);
		reply.send(messageToChange);

	});

	// DELETE
	app.delete<{ Body: {messageId: number}}>("/messages", async(req, reply) => {
		const { messageId } = req.body;

		try {
			const theMessage = await req.em.findOne(Message, { id:messageId });

			await req.em.remove(theMessage).flush();
			console.log(theMessage);
			reply.send(theMessage);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

	// delete all
	app.delete<{ Body: {sender: string}}>("/messages/all", async(req, reply) => {
		const { sender } = req.body;

		try {
			// get all the messages
			const user = await req.em.findOne(User, { email: sender });
			const messages = await req.em.find(Message, { sender:user });

			//now delete all the messages
			for (const message of messages) {

				const theMessage = await req.em.findOne(Message, { id:message.id });
				await req.em.remove(theMessage);
			}
			await req.em.flush(); // just flush once right?

			console.log(messages);
			reply.send(messages);
		} catch (err) {
			console.error(err);
			reply.status(500).send(err);
		}
	});

}

export default DoggrRoutes;
