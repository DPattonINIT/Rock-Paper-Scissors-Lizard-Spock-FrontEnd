# Rock-Paper-Scissors-Lizard-Spock-FrontEnd
// name 
Darryl Patton

 // Date Revised:
 1/19/2025 

 // Exercise
 Rock,Paper,scissors,Lizard, Spock 

 // Brief Description of what you did. 
 I developed a Rock, Paper, Scissors, Lizard, Spock game with a frontend that allows users to interact by selecting their choices, and a backend that handles game logic and computer moves through an API.

 //Figma Approved:
 Isaiah F

Notes:
Figma:
https://www.figma.com/proto/1iqcQHOa3978PSt8j2UL9j/Untitled?node-id=0-1&t=yoJ3Aom7hv0llYbT-1

GitHub:
https://github.com/DPattonINIT/Rock-Paper-Scissors-Lizard-Spock-FrontEnd.git

Vercel:
rock-paper-scissors-lizard-spock-front.vercel.apper




//Peer Review: Gianpaolo Reinares
> Comments: Site looks good, 1v1 functions, Vs Computer looks like it needs some work: 
> I believe that in order to get the computer response, you need to link your fetchComputerChoice() function to the Azure API Link instead of localHost as I receive the 'Error fetching computer choice' output; 
> As a design choice, maybe add a back button on the game pages to bring you back to the main menu; 
> For the 1v1 Game Mode, I would suggest finding a way to hide the First Player's choice by using some sort of stand in text, until the Second Player makes their choice in order to prevent counterplay - I would suggest having the line of text have something like a '_____', then as soon as the Second Player puts their input the '_____' will reveal the First Player's Choice: 
> Other than that, I love how some of the functions are timed and the site is well designed and the code for 1v1 at least functions.