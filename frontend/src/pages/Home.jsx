import { useState } from "react";

export default function Home() {
  const [article, setArticle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const summarize = async () => {
    if (!article.trim()) {
      alert("Please enter a news article.");
      return;
    }

    setLoading(true);
    setSummary("");

    try {
      const res = await fetch("http://127.0.0.1:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: article,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setSummary(data.summary);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setArticle("");
    setSummary("");
  };

  const copySummary = () => {
    navigator.clipboard.writeText(summary);
    alert("Summary copied.");
  };

  return (
    <div className="container">
      <div className="card">

        <h1>📰 AI News Article Summarizer</h1>

        <p>
          Paste any news article and generate a concise AI summary.
        </p>

        <textarea
          value={article}
          onChange={(e) => setArticle(e.target.value)}
          placeholder="Paste your news article here..."
          rows={12}
        />

        <div className="buttons">
          <button onClick={summarize} disabled={loading}>
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>

          <button onClick={clearAll}>
            Clear
          </button>

          {summary && (
            <button onClick={copySummary}>
              Copy
            </button>
          )}
        </div>

        <p>
          Word Count:{" "}
          {article.trim()
            ? article.trim().split(/\s+/).length
            : 0}
        </p>

        {summary && (
          <div className="summary">
            <h2>Generated Summary</h2>
            <p>{summary}</p>
          </div>
        )}

      </div>
    </div>
  );
}