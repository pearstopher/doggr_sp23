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

## 3. 



