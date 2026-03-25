"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input) return;

    const newMessage = {
      role: "user",
      content: input,
    };

    const fakeResponse = {
      role: "assistant",
      data: {
        insight: "Revenue increased by 18% last week.",
        sql: "SELECT SUM(revenue) FROM orders;",
        reasoning: "Used revenue column from orders table...",
        data: [{ revenue: 12000 }],
        confidence: "HIGH",
      },
    };

    setMessages((prev) => [...prev, newMessage, fakeResponse]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-6 p-4">

        {messages.length === 0 && (
          <div className="text-center text-neutral-500 mt-20">
            Ask anything about your data...
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i}>
            {msg.role === "user" ? (
              <div className="flex justify-end">
                <div className="bg-white text-black px-4 py-2 rounded-xl max-w-md">
                  {msg.content}
                </div>
              </div>
            ) : (
              <ResponseCard data={msg.data} />
            )}
          </div>
        ))}

      </div>

      {/* Input */}
      <div className="border-t border-neutral-800 p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          className="flex-1 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-white text-black px-6 rounded-xl"
        >
          Send
        </button>
      </div>
    </div>
  );
}

function ResponseCard({ data }: any) {
  const [tab, setTab] = useState("insight");

  return (
    <div className="border border-neutral-800 rounded-2xl p-4 bg-neutral-900 max-w-2xl">

      {/* Tabs */}
      <div className="flex gap-4 mb-4 text-sm">
        {["insight", "sql", "reasoning", "data"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`capitalize ${
              tab === t ? "text-white" : "text-neutral-400"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-sm text-neutral-300">
        {tab === "insight" && <p>{data.insight}</p>}

        {tab === "sql" && (
          <pre className="bg-black p-3 rounded-lg overflow-x-auto text-green-400">
            {data.sql}
          </pre>
        )}

        {tab === "reasoning" && <p>{data.reasoning}</p>}

        {tab === "data" && (
          <pre className="bg-black p-3 rounded-lg overflow-x-auto">
            {JSON.stringify(data.data, null, 2)}
          </pre>
        )}
      </div>

      {/* Confidence */}
      <div className="mt-4 text-xs text-green-400">
        Confidence: {data.confidence}
      </div>
    </div>
  );
}