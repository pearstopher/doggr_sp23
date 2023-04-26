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
}

export default DoggrRoutes;