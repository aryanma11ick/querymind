export default function DashboardPage() {
  return (
    <div className="space-y-6">

      <h1 className="text-2xl font-semibold">
        Welcome to QueryMind 👋
      </h1>

      <p className="text-neutral-400">
        Start by asking a question in natural language or explore your data visually.
      </p>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900">
          <h3 className="font-medium">Ask a Question</h3>
          <p className="text-sm text-neutral-400 mt-2">
            Use natural language to generate SQL queries instantly.
          </p>
        </div>

        <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900">
          <h3 className="font-medium">Build Dashboard</h3>
          <p className="text-sm text-neutral-400 mt-2">
            Visualize your data with AI-powered charts.
          </p>
        </div>

        <div className="border border-neutral-800 rounded-2xl p-6 bg-neutral-900">
          <h3 className="font-medium">View Alerts</h3>
          <p className="text-sm text-neutral-400 mt-2">
            Monitor anomalies and important metrics.
          </p>
        </div>

      </div>
    </div>
  );
}