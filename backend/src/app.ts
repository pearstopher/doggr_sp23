import Fastify, {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {User} from "./db/entities/User.js";
import {FastifyMikroOrmPlugin} from "./plugins/mikro.js";

import config from "./db/mikro-orm.config.js";

import DoggrRoutes from "./routes.js";
import {FastifySearchHttpMethodPlugin} from "./plugins/http_search.js";

const app: FastifyInstance = Fastify();

await app.register(FastifyMikroOrmPlugin, config);
await app.register(FastifySearchHttpMethodPlugin);

await app.register(DoggrRoutes);




export default app;