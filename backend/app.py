from flask import Flask, request, jsonify
from flask_cors import CORS
from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


@app.route("/")
def home():
    return jsonify({
        "message": "News Article Summarizer API Running 🚀"
    })


@app.route("/summarize", methods=["POST"])
def summarize():
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                "error": "No data received"
            }), 400

        article = data.get("text", "").strip()

        if article == "":
            return jsonify({
                "error": "Please enter an article."
            }), 400

        prompt = f"""
You are an AI News Summarizer.

Summarize the following news article into 4-6 concise sentences.

Article:
{article}
"""

        response = client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": "You summarize news articles accurately."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            temperature=0.3,
            max_tokens=250
        )

        summary = response.choices[0].message.content

        return jsonify({
            "summary": summary
        })

    except Exception as e:
        print(e)
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)