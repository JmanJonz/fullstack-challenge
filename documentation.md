- Okay I got the code cloned to my device open installed the dependencies and got both the frontend and backend up and running. 

- I am a taken a little off guard now becasue I ran the get request for organizations which I assumed would have been prefilled for me in this challenge since my assumption was that I wouldn't have to worry about loading the data in, just about querying it and loading it out in the ui... I looked at the database files and it appears as though there was only sql written to define an organization and nothing else so from what I can tell I am going to have to load some of my own data in so that I can query it and display it to the ui so I think I will start with that. 

- I don't want to take tons of time so once I create the schemas for the accounts and deals I am going to use LLM to create some sql to create some data to load into the database... 

- I use lucid spark for notes and organizing my thoughts a lot so I am going to switch over to there and I can send that over if you would like after I turn this in... As of right now I am writing the instruction in my own words to make sure I clearly get what I am doing. 

- still taking some notes in lucid spark but not too many now... I have spent 1.5 hours on this so far but I need to step away for a few hours. I plan on finishing it up later tonight within the 4 hour mark... I should be able to do the rest late tonight, but if not due to my schedule right now otherwise I won't get around to finishing it till this saturday. But I will keep track of how much time it takes me and report back honestly when I submit it. 

- okay it is saturday I haven't done any more work on it, i'm going to work on it on and off today and track the time I spend on it. 

- I'll just keep taking notes here from now on... 

- Anyways I had ai load mock data sql but I noticed that it is running everytime the server restarts and duplicating a lot of data soo I'm using ai to fix that so that it only adds the data if the tables are empty...

- I tried using gemini to correct the code so that it only loads data in if none has been loaded in already, but it is causing a bunch of errors so I am going to go figure it out and setup those conditions myself...

- I realized that the errors that I was getting were due to Typescript not knowing the object type, sooo I give ai better instructions letting it know that it needs to meet demands of typescript and now it mock data and simple api end points are working good. 

- I'm getting the data simply by calling the different endpoints in the browser localhost:3000/... so now before I start building out the frontend too much I want to go to the rontend and simple fetch and display the data there before I worry about formatting it. 

- Okay I'm back and have all the deal names rendering out to the ui in a boring plain no css way. 

- I'm a little confused how it wants the deals to be displayed. I assume by organization or something but I'm going to go back through and look at the criteria more before continuing. 

- Okay yeah I have been looking at the screen shot and I am still not exactly sure what is going on there. It looks like it is a page showing the deals for a specific organization I think but then there are three columns with subheadings and a bunch of other things with values below so I am starting to think that maybe it is pulling in deals for an organization and that the subheadings are account names maybe and then the deals for that organization is organized by account down below? 

- These are assumptions that I am making so I am just going to move forward for now editing my backend endpoints so that you can pass to it an organization id and then only get the deals returned back for that specific org instead of all of the deals currently in the database. 

- I noticed that ai didn't link accounts to org and deals to accounts so I revised my prompt and got that fixed so that I can now continue making the api endpoint to get all of the deals for an organization by getting all of deals linked to accounts that are linked to the org in the endpoint. 

- Kind just just thinking out loud here, accounts have an org id that links them to org and deals have an id that links them to an account sooo if I want to get all deals for an organization I will need to take in the org id as a parameter in the request and then get all of the accounts that link to that org and then return all of the deals for each of those accounts... This is what I am going to do. 

- Got that working so now I need to dynamically somehow take in the org id from the frontend so that I can get the deals for a specific org on the frontend in order to render them out as desired. I'm going to go set that up now through the react router. Gonna install that and set it up rn. 

- Sweet, I now am using the backend api to fetch all the deals for a specific org id and they are being rendered out onto the screen without styling. So now I am going to go through and structure the html and then style it using tailwind since another job I am interviewing for uses tailwind and I have never used it yet so I'm just using that to get some practice with it...

- I'm still not sure what is going on in the screen shot... Like what are the title's in the gray boxes representing (Build Proposal, Pitch Proposal, & Negotiation)--------------- If I were working at SponsorCX I would ask questions to get clarifications on this, but since I am not and since I am getting close to working 4 hours on this I am just going to display all of the deals in a simple list for a requested organization, add some simple styles to it, and then try to add in the filter functionality real quick to it. 