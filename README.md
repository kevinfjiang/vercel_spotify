# Vercel Spotify

Using vercel to display most liked songs, used for my musichum final project and my README. My previous version was broken therefore I migrated to using NextJS, something vercel will always support because they recently acquired the framework. I've updated to NextJS 13 using the app router and API routes to return an svg. This is fully deployable, granted you follow the setup guide.

## Deploying
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/kevinfjiang/vercel_spotify)

# Setup Guide

Guide by [JoshLmao](https://github.com/JoshLmao)

### Part 1: Vercel & Deploy

Setup with a click of a button 😉

[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/kevinfjiang/vercel_spotify)

1. Sign up or Sign in to use [Vercel](https://vercel.com/) for hosting the repo.

2. Leave the remaining settings for now and click 'Deploy'

### Part 2: Configure Environment Vars

1. Navigate to [Spotify Dashboard](https://developer.spotify.com/dashboard/) and create a new app.
   <img src="https://i.imgur.com/msl76HF.png" height="300">

2. Click, edit settings and add "http://localhost:3000/callback" to the "Redirect URIs" section then save
   <img src="https://i.imgur.com/wm4IoDH.png" height="400">

3. Click 'SHOW CLIENT SECRET' under Client ID. Copy both Client ID and Client Secret and paste them into `.env` file in the root directory of this repository (create the file if it does not exist) like so:

```ini
SPOTIFY_CLIENT_ID=1234567890
SPOTIFY_CLIENT_SECRET=1234567890
```

5. Next, we need to retrieve a Refresh Token through [Authoration Code flow](https://developer.spotify.com/documentation/general/guides/authorization-guide/#authorization-code-flow).

There is a node script, `generate-refresh-token.js` to get this for you. Run the following commands:

```bash
npm install
node ./generate-refresh-token.js # You will be asked to login to your spotify account
```

6. Navigate to your deployment on Vercel and click on Settings, then click on "Environment Variables"

   <img src="https://i.imgur.com/kUEW5Tt.png" height=400 />

7. Insert the following Variable names and insert your values from the previous steps

```
Name: SPOTIFY_CLIENT_ID
Value: MY_CLIENT_ID

Name: SPOTIFY_CLIENT_SECRET
Value: MY_SECRET_ID

Name: SPOTIFY_REFRESH_TOKEN
Value: MY_REFRESH_TOKEN
```

8. Once done, navigate to one of your deployment url's and place "/now-playing" at the end. For example, "https://now-playing-joshlmao.vercel.app/now-playing"

9. Replace "MY_VERCEL_DEPLOYMENT_URL" in the following code with one of your deployment url's and insert it into any ReadMe.md

```
<a href="https://MY_VERCEL_DEPLOYMENT_URL/now-playing?open">
    <img src="https://MY_VERCEL_DEPLOYMENT_URL/now-playing" width="256" height="64" alt="Now Playing">`
</a>
```

That's it! Below is an example of what it should look like. If you have any problems, make sure to re-read the instructions and follow them precisely!

<img src="https://i.imgur.com/uxeiC8k.png">


Based off the spotify readme by https://github.com/natemoo-re/natemoo-re.