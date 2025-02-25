import 'chai/register-should.js';  // Using Should style

import {test, teardown} from "tap";
import {faker} from "@faker-js/faker";
import app from '../src/app.js';


// Cleanup, runs after ALL this file's tests have finished!
teardown( () => app.close());

test('requests the "/hello" route', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/hello'
	});

	response.statusCode.should.equal(200);
	response.body.should.equal("hello");
});

test('requests the "/hello2" route', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/hello2'
	});

	response.statusCode.should.equal(200);
	response.body.should.equal("hello2");
});

test('Listing all users from /dbTest', async () => {
	const response = await app.inject({
		method: 'GET',
		url: '/dbTest'
	});

	response.statusCode.should.equal(200);
});

test('Creating new user', async () => {

	const payload = {
		name: "Testname",
		email: faker.internet.email(),
		petType: "Dog"
	};

	const response = await app.inject({
		method: 'POST',
		url: '/users',
		payload
	});

	response.statusCode.should.equal(200);
	response.payload.should.not.equal(payload);
	const resPayload = response.json();
	resPayload.email.should.equal(payload.email);
	resPayload.petType.should.equal("Dog");
});
