# lookr

lookr is a minimal profile card generator for github and slack users. (SLACK IS CURRENTLY BEING WORKED ON NEST SERVER IS WORKING MOREOVER IN TROUBLESHOOT)


![lookr preview](https://github.com/RichardD242/Website-test/blob/main/readmepic1.png?raw=true)

---

## how to use

### 1. web-version

1. go to https://lookr-zeta.vercel.app/lookr
2. enter any github or slack (slack is not supported yet) username
3. click copy code

![preview slack web](https://github.com/RichardD242/Website-test/blob/main/readmepic3.png?raw=true)

### 2. slack-version (doesnt work scroll to troubleshoot)

go to the #lookr-sandbox slack channel and use these commands:

- `/lookr github <username>` | generates a lookr card
- `/lookr slack <username>` | gives all info to usernames slack (comming soon)
- `/lookr repo <username>` | gives a overview of usernames repos in order of stars
- `/lookr help` | displays all of the commands
- `/lookr boss` | easter egg

---

## stack

### frontend

- **Framework:** React (Typescript)
- **Build Tool:** Vite
- **Styling:** Tailwind css v4
- **math:** simplex noise

### backend

- **Hosting:** Vercel
- **Server:** Nest Hackclub Ubuntu Server

---

## development

To get a local copy running, follow these steps:

1. clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/lookr.git
cd lookr
```

install dependencies:

```bash
npm install
```

start local server:

```bash
npm run dev
```

pages
/features

/api-card

/about

/home

/lookr

In /features you can find a topographic background generator that was used for the beautiful design and aesthetics.

/api-card COMMING SOON look troubleshoot.

In /lookr you can find the full card generator unfortunelty slack lookr isnt available yet.

all features
supports both horizontal cards (/lookr) and vertical (/api-card comming soon)

the card updates realtime with unlimited searches

topographic design looks very clean and cool

slack integration comming soon

![topographics](https://github.com/RichardD242/Website-test/blob/main/readmepic2.png?raw=true)

---


## troubleshoot
### what isnt available yet
results: no slack intergration and lookr cards server api

### problems and failures
overall the bot got stuck in a silent disconnect loop where the systems around it stopped talking to each other causing the three layers to fail to connect a nest platform routing quirk that will be fixed later i successfully fixed the network gateway problems but the compiler refused to update the execution file

### build failure
no matter how many times src/index.ts was edited to fix the server logic the changes never actually made it to the running bot the terminal logs kept printing the old execution message instead of the new server receiver message a background tool like dotenvx or a locked typescript cache was constantly deploying an old snapshot of the code the bot was running a ghost version of the old build that did not know how to handle slacks incoming connections

### slash command tests
when typing a slash command in slack the bot did not react and the pm2 logs stayed completely silent slack dropped the request on its end due to the outdated server receiver configuration

### what do i do next
i will fix the typescript compiler pathing and clear the environment cache later for now i need to ship this version for my event ticket today was spent troubleshooting this in the terminal for 2 hours while the network proxies and ports worked perfectly the application code itself wasnt successfully updating to listen or respond to api calls

---

## for reviewers

### slackbot repo

[repo](https://github.com/RichardD242/lookr-bot)

---

## Slackbot repo readme

a slack slash command bot for slack channel #lookr-sandbox

### description

lookrbot fetches github user info with repo data or slack info directly through the channel with slash commands. users can then view their card with their follower count, repo stats and top repos in order of stars from the hackclub workspace

### important notes

still being worked and wasnt fully tested yet

### technical info

- typescript
- slack bolt
- github api
- axios

### setup
install dependencies:
npm install

create a .env file:
- SLACK_BOT_TOKEN
- SLACK_SIGNING_SECRET
- PORT = 3000 or 8080

run
npm start or npm run dev