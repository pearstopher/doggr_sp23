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
    
   
3. A new Message page. It should have, at minimum, the user
you're messaging's profile picture, a text entry box for the 
message, and a Send button for actually sending the message

    <br>All three of these requirements are present! They are pretty
basic, but they are all there and they work!
    <br> The messages page uses URL variables, so the links look like
"/message/[from]/[to]" where "from" is the user ID of the user who is
sending the message, and "to" is the user ID fo the user who is
receiving it.

## Bonus

1. Add a Message History page.

    
2. It should be restricted to logged-in users, so only show the link to the message history page if a user is logged in.  Similarly, ProtectedRoute it so that un-logged-in users get redirected to Login
- The page itself should show all message exchanges sent from/to your user.
- Each message should have a small thumbnail profile picture next to the text
- Each message should have a "Reply" button that navigates to the Message page so that the user can respond







We've already implemented Match and Pass functionality, so all that is left is Messaging between users.  This is your task!
Hints:
This is almost identical to Match/Pass!  The only difference is that instead of clicking Match, the user will have a text input box that transmits whatever text is inside of it (the message)
Things you'll need that already exist:
- You already developed the backend for this in the first HW (Message routes)
- You also already have the database table for them (messages)
- This doesn't mean you might not need to change htem a little as you work
Things you'll need to add on frontend:
- A button on the Match page to send said profile a message
- The route to Messages should be a ProtectedRoute so that non-logged-in users are redirected to Login if they attempt to access Messages
- A new Message page
- It should have, at minimum, the user you're messaging's profile picture, a text entry box for the message, and a Send button for actually sending the message
BONUS
- Add a Message History page.  
- It should be restricted to logged-in users, so only show the link to the message history page if a user is logged in.  Similarly, ProtectedRoute it so that un-logged-in users get redirected to Login
- The page itself should show all message exchanges sent from/to your user.
- Each message should have a small thumbnail profile picture next to the text
- Each message should have a "Reply" button that navigates to the Message page so that the user can respond