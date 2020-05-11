# Planning Center Song Report

This program will run through your Planning Center account and create a CSV with
the sizes of all the attachments of all the songs in your account. It's not very
stable, and was just written to solve a problem I have, but it might get you
started with a basic system of querying Planning Center if you need something of
the sort.

## Warning

> This script doesn't take into account API limits

This script has some crude breathing code to allow the API to breathe, but it
doesn't take into account any rate limits from Planning Center, so it's possible
to get your account **blocked or suspended**.

## Configuration

This script requires environment vairables to be set. Set them in the usual way,
or write a .env file and invoke this script via `node -r dotenv/config .`

| variable       | description                                           |
| -------------- | ----------------------------------------------------- |
| APPLICATION_ID | The Application ID from your [personal access tokens] |
| SECRET         | The Secret from your [personal access tokens]         |

[personal access tokens]: https://api.planningcenteronline.com/oauth/applications

## Running

Just set your environment variables, and run via `node .` or
`node -r dotenv/config .` or `npm start`.
