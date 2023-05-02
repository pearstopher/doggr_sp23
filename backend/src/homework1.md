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


## 2. 


