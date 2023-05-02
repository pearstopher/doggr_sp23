# Homework 1
Christopher Snow

## 1. Implement messages between users

I determined that Messages would need a unique ID instead of a
composite one like Matches. This is because users must be able
to send multiple messages to the same person, which would be
impossible if messages were uniquely identified by the sender
and receiver.

1. I create the routes for Messages in routes.ts
2. I added db/entities/Message.ts to describe the messages table
3. I created a new migration in db/migrations
4. I created a Message seeder in db/messages with some messages


## 2. Bad words filter

After spending hours trying to figure out how to read in a file,
including reading all of the best advice on the discord channel,
I gave up and added the bad words into a .ts file where I split
and converted them into an array.

One of my other thoughts was to just do a web request for the file.
This could potentially be better than hard-coding it anywhere, in
case the bad words list is updated, because then we would get the
updates automatically. Although this was easy to do, I think it
would be really slow to have to do that many external requests.

Anyway, the file gets loaded and each entry gets checked against
the message contents. I tried sending some messages with bad words
and they were all successfully caught, and I was called naughty.
I'm not super happy with the design but it definitely works!

## 3. Add an admin role

This one was fun. I believe I have everything working correctly
just like the assignment asks:

1. I set an admin password in my .env and .example.env
2. I required the password to be provided in requests to:
   1. delete a user
   2. delete a message
   3. delete all of a user's messages
3. I send the correct status code when the password fails (401)

## Bonus #1. Soft deletion

I didn't implement this. It's a cool idea, but it all looked 
scary. I did the other two bonus parts though! 

## Bonus #2,3. User roles, individual admin passwords

This was great. I added a role and password for the users and
updated my entities/migration/seeders. The role must be "User" or
"Admin" and everybody gets to have a password.

I didn't want to undo my changes from the actual homework in
Part 2 so I kept my .env shared admin password. As a result, in
order to delete users, you need to give the shared admin password
as well as your admin credentials (email and password).

The JSON for a successful /users DELETE request could look like
this:

```json
{
    "email": "email4@email.com",
    "password": "doggr",
    "admin_email": "email@email.com",
    "admin_pass": "doggr"
}
```
This works because for the following reasons as specified by the
assignment:

1. "email" is the email of a user. We are allowed to delete users.
2. "password" is the correct shared admin password from part 2.
3. "admin_email" is a valid user email with the Admin role.
4. "admin_pass" is the password for the user with admin_email





