# doodle-clone
A collaborative project to create a Doodle clone.

Generally speaking, this project could only have two main pages, e.g. availability.html & createevent.html.
The first page a user should see would be availability. Here, a user could set or modify their current availability.
Anytime a user wishes to create an event, then the browser could navigate to createevent.html.

On this point, are the two htmls even necessary? I don't know enough about web development but couldn't our JS code
simply switch "modes" to allow the user to access all of the functionality that comes with creating events. This would allow for
a better user experience since they would not have to ever leave the initial page.

Data storage is an obstacle. As we have talked about, we should use some sort of I/O file solution. I'm not sure if a spreadsheet
or just a text document would work better. But in any case, it would probably be good to write some methods for outFiling
and inFiling to/from the document. These would be run whenever the page closes/opens.

At this point this is just brainstorming and perhaps an unconventional use of GitHub and the repository's README file.
But we all start some place and this is mine.
