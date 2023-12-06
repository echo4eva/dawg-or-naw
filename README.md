## About

This classification app determines if a user inputted image is a dog or a cat.

The classification model I used is hosted on [Hugging Face](https://huggingface.co/spaces/echo4eva/minimal). I used the Gradio API to access it and display it on the frontend of this app.

## Setup

******JavaScript****** dependencies:

- `axios` for frontend to communicate with backend, that’s about it

Just run this to install all dependencies once in root folder.

```bash
npm install
```

You should also setup a `.env.local` file that takes in the `NEXT_PUBLIC_URL`. Place that in the file in the root and set the key's value to `http://localhost:<port of flask server>` (make sure there's no leading slash). I only did this to deploy to Vercel, but Vercel sucks, doesn't allow backend like this.

**********************Python********************** dependencies:

First make sure to create a python virtual environment. Then activate the environement before installing dependencies.

- `gradio_client` to interact with gradio
- `flask` for our backend to communicate with the gradio api
- `flask_cors` for CORS, [this is a great answer for what that is](https://stackoverflow.com/a/64137023)

Just run this to install all dependencies, should get info from the Pipfile once in root folder. I haven’t tested it, if it doesn’t work just install manually.

```bash
pipenv install
```

**How to Run**

Then once you're done, run the `server.py` file and do `npm run dev`. That's it, happy whatever you'll be doing with this app.

## Possible Issues

In `api\server.py` I’m not sure if the `Client` needs a token or not. I’m running it on my own machine which is registered with Hugging Face through SSH. If it doesn’t work for you, that’s probably why. [Here’s some documentation about it](https://www.gradio.app/guides/getting-started-with-the-python-client#connecting-to-a-hugging-face-space). If that’s not the issue, then go figure it out for yourself. Duplicate the space, make your own space and model, I don’t know.
