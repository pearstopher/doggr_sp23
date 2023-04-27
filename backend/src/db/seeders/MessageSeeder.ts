import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Message} from "../entities/Message.js";
import {User} from "../entities/User.js";

export class MessageSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const users = await em.find(User, {});

		//user 1 is going to send a message to everybody
		em.create(Message, {
			from: users[0],
			to: users[1],
			body: "This is a message."
		});

		em.create(Message, {
			from: users[0],
			to: users[2],
			body: "This is a message."
		});

		em.create(Message, {
			from: users[0],
			to: users[3],
			body: "This is a message."
		});

		//user 2 is going to send a message to everybody as well
		em.create(Message, {
			from: users[1],
			to: users[0],
			body: "This is a message."
		});

		em.create(Message, {
			from: users[1],
			to: users[2],
			body: "This is a message."
		});

		em.create(Message, {
			from: users[1],
			to: users[3],
			body: "This is a message."
		});

	}
}
