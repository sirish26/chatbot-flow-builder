import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="w-full max-w-xl bg-white/80 border border-teal-100 rounded-lg p-4 mb-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2 text-teal-900">
            Chat Flow Builder Features
          </h3>
          <ul className="list-disc pl-5 text-sm text-teal-900 space-y-1">
            <li>Drag and drop or click to add nodes to the canvas</li>
            <li>Edit node text in a side panel with real-time updates</li>
            <li>Connect nodes visually with edges</li>
            <li>Only one root node (no incoming edges) is allowed</li>
            <li>Each node can have only one outgoing edge</li>
            <li>All message nodes must have non-empty text</li>
            <li>
              Clear the canvas after saving, with flow data logged to the console
            </li>
          </ul>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/flow-builder"
            className="rounded-full border border-solid border-teal-400 bg-teal-100 text-teal-900 transition-colors flex items-center justify-center gap-2 font-medium text-sm sm:text-base h-10 sm:h-12 px-6 sm:px-8 shadow hover:bg-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Chat Flow Builder
          </Link>
          
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
      </footer>
    </div>
  );
}
