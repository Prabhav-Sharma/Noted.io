# [Noted.io](https://notedio.netlify.app/)
A notes app built using ReactJS

The app allows you to write and manage notes in an organised and efficient manner

## Screens
![chrome-capture-2022-4-21 (1)](https://user-images.githubusercontent.com/88072012/169648239-950b9b77-1696-4d30-b79e-14a7f6e407ae.gif)

## Features
### Authentication 
- Authentication allows the user to login/signup into the app to unlock personalized features.
- Redirects user to login page, if an attempt is made to navigate to protected pages which require the user to be authenticated.
- Authentication is achieved by using an encoded token so as to not publicize user data.

### Home
- The user can view all their notes that are not deleted or archvied.
- They can sort their notes either by most recently updated or otherwise. 
- The user can pin notes at the top.

### Archives
- All the notes that the user has archived will be easily accessible from here.
- The user can perform all notes operations on the archived notes.
- They can recover notes which will add them back to the home notes.

### Trash
- The user can view all the notes they've added to trash or deleted from either the home page or the archives page.
- The notes can be recovered from here, which will add them back to the home notes.
- Added as a security against accidently deleting notes. 
- The user can't make changes to the notes from here before recovering them first.
- The user can permanently delete the notes.

### Search
- The user can search for a specific query in all the notes.
- They can either search for a query in the title of the notes, the labels or the text in the notes.
- They can perform the operations on each type of note in the same manner as on their specific pages.

### Profile Page
- The profile page lists the information of the user such as their full name, email, the date the account was created on.
- The user's stats such as the total number of notes in each category are counted and shown. 
- The total number of characters in all notes combined are also shown here.

### Note
- The user can edit the contents of the note such as note's title and content.
- Depending on the notes origin, certain buttons will be shown to perform note actions. For example, if the note is from the home section, it will have the option to archive or delete the note. If the note is from archives, it can be recovered or deleted, and finally, if the notes is from trash then the note can't be edited but only be recovered or permanently deleted.
- The note's labels can be viewed.
- Rich text editing, can also include images.

## Worthy inclusions
### The note color
Depending on the note's color decided by the user, the note's text color will be calculated by a function that checks if the note color is bright or dark. If it's bright then the text-color will be black, and vice-versa.

### The Save Button
The save button continously checks the current note's editable state and the note that was loaded from the database. If there are any net changes, the save button appears on the note that allows the user to save these changes.

This is done to ensure that too many API calls are not fired, the user may not be done with the changes or may end up deciding that they don't want to save the changes after all. 
