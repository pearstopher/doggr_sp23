# Homework #2

Christopher Snow

Spring 2023



## Requirements

1. *A button on the match page to send said profile a message*

    <br>Each profile on the match page now has a "message" link. Clicking
this will take the user to a separate message page where they can
send the user a message.


2. *The route to Messages should be a ProtectedRoute so that 
non-logged-in users are redirected to Login if they attempt
to access Messages*

    <br>The route is protected. If users try to go here without
being logged in, they are redirected to the login page. The API
call that handles the sending and receiving of messages is protected 
as well, so trying to send a message won't work unless you have
a valid token. (It's not super protected though, any valid token
will work. This means any sneaky user could send a message as any
other.)
    
   
3. *A new Message page. It should have, at minimum, the user
you're messaging's profile picture, a text entry box for the 
message, and a Send button for actually sending the message*

    <br>All three of these requirements are present! They are pretty
basic, but they are all there and they work!
    <br> The messages page uses URL variables, so the links look like
"/message/[from]/[to]" where "from" is the user ID of the user who is
sending the message, and "to" is the user ID fo the user who is
receiving it. I could think of a few ways to do this like using the saved
state, but this is the one I settled with.

## Bonus

1. Add a Message History page.

    <br>Done! A user's messages are now located at the frontend URL
"/messages/". The message page is:

    - Restricted to logged-in users
    - Redirects to the login page if you are not logged in
    - Link displays only when logged in
    - Shows all messages both sent and received

   <br> Visually, each message contains:
    - A small thumbnail picture next to the message text
    - A reply button that lets you send a message to the user
    - of course, the message text and the name of the dog as well
    