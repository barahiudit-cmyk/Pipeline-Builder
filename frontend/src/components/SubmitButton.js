import { useState } from "react";
import { Play } from "lucide-react";
import { useStore } from "../store";
import { ResultModal } from "./ResultModal";

const API_URL = "http://localhost:8000/pipelines/parse";

export const SubmitButton = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const nodes = useStore((s) => s.nodes);
  const edges = useStore((s) => s.edges);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      alert("Add at least one node to the pipeline before submitting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      setResult(data);
    } catch (err) {
      alert(`Could not reach the server.\n\n${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="px-4 py-3 border-t border-gray-200 dark:border-[#1F1F23]
                      bg-white dark:bg-[#111113]
                      flex justify-center">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 px-6 py-2.5
                     bg-indigo-500 hover:bg-indigo-600
                     disabled:bg-gray-300 dark:disabled:bg-[#27272A]
                     disabled:text-gray-500 dark:disabled:text-[#71717A]
                     text-white text-[14px] font-semibold
                     rounded-lg transition-colors
                     
                     disabled:shadow-none
                     active:scale-95">
          <Play size={16} fill="currentColor" />
          {loading ? "Submitting..." : "Submit Pipeline"}
        </button>
      </div>

      <ResultModal result={result} onClose={() => setResult(null)} />
    </>
  );
};
