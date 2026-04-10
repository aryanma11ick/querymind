"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import ChartRenderer from "@/components/ChartRenderer";

// ✅ shadcn imports
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatPage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { data } = await supabase.auth.getSession();
      const session_id = data.session?.user?.id || "guest";

      const res = await fetch("http://localhost:8000/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage.content,
          session_id,
        }),
      });

      const dataRes = await res.json();

      let chart = null;

      try {
        if (dataRes.sql) {
          const vizRes = await fetch("http://localhost:8000/api/visualize", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              sql: dataRes.sql,
            }),
          });

          chart = await vizRes.json();
        }
      } catch {
        console.log("Chart failed");
      }

      const botMessage = {
        role: "assistant",
        data: {
          insight: dataRes.insight,
          sql: dataRes.sql,
          reasoning: dataRes.reasoning,
          data: dataRes.rows,
          confidence: dataRes.confidence,
          chart,
        },
      };

      setMessages((prev) => [...prev, botMessage]);

    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          data: {
            insight: "⚠️ Error connecting to backend",
            sql: "",
            reasoning: "",
            data: [],
            confidence: "LOW",
            chart: null,
          },
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full">

      {/* 🧠 Messages */}
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
                <div className="bg-white/90 text-black px-4 py-2 rounded-xl max-w-md shadow">
                  {msg.content}
                </div>
              </div>
            ) : (
              <ResponseCard data={msg.data} />
            )}
          </div>
        ))}

        {loading && (
          <div className="text-neutral-400 text-sm">
            Thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* 💬 Input */}
      <div className="border-t border-white/10 p-4 flex gap-2 bg-neutral-900/50 backdrop-blur-md">

        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="bg-neutral-800 border-neutral-700"
        />

        <Button
          onClick={handleSend}
          disabled={loading}
          className="bg-white text-black hover:bg-neutral-200"
        >
          Send
        </Button>

      </div>
    </div>
  );
}


function ResponseCard({ data }: any) {
  const [tab, setTab] = useState("insight");

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-md max-w-2xl transition hover:bg-white/10">
      <CardContent className="p-4">

        {/* Tabs */}
        <div className="flex gap-4 mb-4 text-sm">
          {["insight", "sql", "reasoning", "data", "chart"].map((t) => (
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

          {tab === "chart" && data.chart && (
            <ChartRenderer
              data={data.chart.rows}
              recommendation={data.chart.recommendation}
            />
          )}

          {tab === "chart" && !data.chart && (
            <p className="text-neutral-500">No chart available</p>
          )}
        </div>

        <div className="mt-4 text-xs text-green-400">
          Confidence: {data.confidence}
        </div>

      </CardContent>
    </Card>
  );
}