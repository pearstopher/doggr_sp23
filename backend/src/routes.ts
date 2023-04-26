// Routes.ts
import {User} from "./db/entities/User.js";
import { FastifyInstance, FastifyReply, FastifyRequest} from "fastify";


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



	app.post<{
		Body: {
			name: string,
			email: string,
			petType: string,
		},
		Reply: {
			message: string,
		}
	}>("/users", async (req, reply: FastifyReply) => {
		// Fish data out of request (auto converts from json)
		const {name, email, petType} = req.body;

		try {
			// Get our manager from the plugin we wrote
			const newUser = await req.em.create(User, {
				name,
				email,
				petType
			});

			// This will immediately update the real database.  You can store up several changes and flush only once
			// NOTE THE AWAIT -- do not forget it or weirdness abounds
			await req.em.flush();

			console.log("Created new user:", newUser);
			return reply.send(newUser);
		} catch (err) {
			console.log("Failed to create new user: ", err.message);
			return reply.status(500).send({ message: err.message});
		}
	});


	// We have to use .route() here because we need a non-standard http method, SEARCH
	app.route<{Body: { email: string}}>(
		{
			method: "SEARCH",
			url: "/users",

			handler: async(req, reply) =>
			{
				const { email } = req.body;
				console.log("Email is: ", email);
				try {
					const theUser = await req.em.findOne(User, { email });
					console.log(theUser);
					reply.send(theUser);
				} catch (err) {
					console.error(err);
					reply.status(500).send(err);
				}
			}
		});
}

export default DoggrRoutes;