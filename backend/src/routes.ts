// Routes.ts
import {User} from "./db/entities/User.js";
import {Match} from "./db/entities/Match.js";
import { FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {ICreateUsersBody} from "./types.js";


async function DoggrRoutes(app: FastifyInstance, _options = {}) {
	if (!app) {
		throw new Error("Fastify instance has no value during route construction");
	}

	app.get("/hello", async(_req: FastifyRequest, _reply: FastifyReply) => {
		return 'hello';
	});

	app.get("/hello2", async(_req, _reply) => {
		return 'hello2';
	});

	app.get("/dbTest", async (req, _reply) => {
		return req.em.find(User, {});
	});



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

	// R
	app.search<{Body: { email: string}}>("/users", async (req, reply) => {
		const {email} = req.body;

		try {
			const theUser = await req.em.findOne(User, {email});
			console.log(theUser);
			reply.send(theUser);
		} catch (err) {
			console.error(err);
			reply.status(500)
				.send(err);
		}
	});
	// U
	app.put<{Body: { email: string, name: string, petType: string}}>("/users", async(req, reply) => {
		const {email, name, petType} = req.body;

		const userToChange = await req.em.findOne(User, {email});
		userToChange.name = name;
		userToChange.petType = petType;

		await req.em.flush();
		console.log(userToChange);
		reply.send(userToChange);

	});

	// D
	app.delete<{Body: { email: string }}>("/users", async(req, reply) => {
		const {email} = req.body;

		// using reference is enough, no need for a fully initialized entity
		const userToDelete = await req.em.findOne(User, {email});

		await req.em.remove(userToDelete).flush();
		reply.send();

	});


	app.post<{Body: { email: string, matchee_email: string }}>("/match", async (req, reply) => {
		const { email, matchee_email } = req.body;

		const matchee = await req.em.findOne(User, {email: matchee_email});
		const owner = await req.em.findOne(User, {email});

		const newMatch = await req.em.create(Match, {
			owner,
			matchee
		});

		await req.em.flush();

		return reply.send(newMatch);

	});



}

export default DoggrRoutes;