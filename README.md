\# 📰 AI News Article Summarizer



\## Overview

This project is an AI-powered News Article Summarizer built using React, Flask, and the Groq API. It generates concise summaries of long news articles using the Llama 3.3 language model.



\## Features

\- AI-powered news summarization

\- Fast response using Groq API

\- Responsive user interface

\- Copy summary to clipboard

\- Word counter

\- Error handling



\## Tech Stack

\- React (Vite)

\- Flask

\- Python

\- Groq API

\- HTML

\- CSS

\- JavaScript



\## Installation



\### Backend

```bash

cd backend

python -m venv venv

venv\\Scripts\\activate

pip install -r requirements.txt

python app.py

```



\### Frontend

```bash

cd frontend

npm install

npm run dev

```



\## API Endpoint



POST `/summarize`



\### Request

```json

{

&#x20; "text": "Paste your article here"

}

```



\### Response

```json

{

&#x20; "summary": "Generated summary"

}

```



\## Author

\*\*Mehak Gupta\*\*

