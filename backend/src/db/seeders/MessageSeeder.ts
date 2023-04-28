import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import {Message} from "../entities/Message.js";
import {User} from "../entities/User.js";

export class MessageSeeder extends Seeder {
	async run(em: EntityManager): Promise<void> {
		const users = await em.find(User, {});

		//user 1 is going to send a message to everybody
		em.create(Message, {
			sender: users[0],
			receiver: users[1],
			message: "This is a message."
		});

		em.create(Message, {
			sender: users[0],
			receiver: users[2],
			message: "This is a message."
		});

		em.create(Message, {
			sender: users[0],
			receiver: users[3],
			message: "This is a message."
		});

		//user 2 is going to send a message to everybody as well
		em.create(Message, {
			sender: users[1],
			receiver: users[0],
			message: "This is a message."
		});

		em.create(Message, {
			sender: users[1],
			receiver: users[2],
			message: "This is a message."
		});

		em.create(Message, {
			sender: users[1],
			receiver: users[3],
			message: "This is a message."
		});

	}
}
