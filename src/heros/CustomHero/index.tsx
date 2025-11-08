import React from "react";

export const CustomHero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[600px] bg-gradient-to-br from-[#10131a] to-[#2a3a4e] flex flex-col md:flex-row items-stretch">
      {/* Left: Text and Steps */}
      <div className="flex flex-col justify-center px-8 py-12 md:w-1/2 w-full max-w-xl z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-left">
          <span className="text-primary">Devin</span>, the AI<br />
          <span className="text-white">software engineer</span>
        </h1>
        <p className="text-lg text-slate-300 mb-8 max-w-md">
          Crush your backlog with your personal AI engineering team.
        </p>
        <button className="bg-primary text-white px-6 py-2 rounded-lg font-semibold mb-8 w-fit shadow-lg hover:bg-primary/90 transition">
          Start building
        </button>
        {/* Stepper */}
        <ol className="space-y-3 mt-6">
          <li className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 text-white font-bold">1</span>
            <div>
              <div className="text-base font-semibold text-white">Ticket</div>
              <div className="text-xs text-slate-400">Integrates with Slack and Linear</div>
            </div>
          </li>
          <li className="flex items-start gap-3 bg-white/5 rounded-lg p-2">
            <span className="w-8 h-8 flex items-center justify-center rounded bg-primary text-white font-bold">2</span>
            <div>
              <div className="text-base font-semibold text-white">Plan</div>
              <div className="text-xs text-slate-400">Devin can ask for more info</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 text-white font-bold">3</span>
            <div>
              <div className="text-base font-semibold text-white">Test</div>
              <div className="text-xs text-slate-400">Devin makes sure the changes work</div>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-8 h-8 flex items-center justify-center rounded bg-slate-800 text-white font-bold">4</span>
            <div>
              <div className="text-base font-semibold text-white">PR</div>
              <div className="text-xs text-slate-400">Request changes directly on the PR</div>
            </div>
          </li>
        </ol>
      </div>

      {/* Right: Flowchart Cards */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-12">
        {/* Arrows and connecting lines are simulated with absolute positioned divs and SVGs */}
        <div className="relative w-full max-w-xl h-[540px] flex flex-col items-center justify-between">
          {/* Card 1: Research */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[330px] md:w-[380px]">
            <div className="rounded-xl bg-slate-100/60 dark:bg-slate-800/60 p-2 shadow-lg mb-2 flex items-center gap-2">
              <span className="rounded bg-primary text-white px-3 py-0.5 text-sm font-semibold">1</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">Research</span>
            </div>
            <div className="rounded-xl bg-black/90 text-white p-4 shadow-lg text-xs font-mono">
              <div className="mb-2 text-slate-300">Devin is scanning the codebase</div>
              <ul className="text-slate-400 list-disc pl-5">
                <li>HeaderWithMobileSidebar.tsx:497-500 <span className="text-slate-600">wdw/src</span></li>
                <li>api.py:519-554 <span className="text-slate-600">webserver/webhooks</span></li>
                <li>collect_data.py:10-60 <span className="text-slate-600">da</span></li>
                <li>HeaderWithMobileSidebar.tsx:517-520 <span className="text-slate-600">wdw/src</span></li>
              </ul>
            </div>
          </div>

          {/* Arrow 1 to 2 */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-[110px]" width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
          </svg>

          {/* Card 2: Plan */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[150px] w-[330px] md:w-[380px]">
            <div className="rounded-xl bg-slate-100/60 dark:bg-slate-800/60 p-2 shadow-lg mb-2 flex items-center gap-2">
              <span className="rounded bg-primary text-white px-3 py-0.5 text-sm font-semibold">2</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">Plan</span>
            </div>
            <div className="rounded-xl bg-black/90 text-white p-4 shadow-lg">
              <div className="font-semibold mb-2">Plan Overview</div>
              <ul className="list-disc pl-5 text-xs">
                <li>Implement Redis pubsub in <span className="text-blue-400">communicator.py</span></li>
                <li>Add a new <span className="text-blue-400">sessions.py</span> cancellation endpoint</li>
                <li>Run lint, tests, and open a PR</li>
              </ul>
              <div className="mt-2 text-xs text-slate-400">Confidence: <span className="font-semibold text-yellow-400">Medium</span></div>
            </div>
          </div>

          {/* Arrow 2 to 3 */}
          <svg className="absolute left-1/2 -translate-x-1/2 top-[295px]" width="2" height="40" viewBox="0 0 2 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="0" x2="1" y2="40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="6 6" />
          </svg>

          {/* Card 3: Question */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[335px] w-[330px] md:w-[380px]">
            <div className="rounded-xl bg-slate-100/60 dark:bg-slate-800/60 p-2 shadow-lg mb-2 flex items-center gap-2">
              <span className="rounded bg-primary text-white px-3 py-0.5 text-sm font-semibold">3</span>
              <span className="text-slate-700 dark:text-slate-200 font-medium">Question</span>
            </div>
            <div className="rounded-xl bg-black/90 text-white p-4 shadow-lg">
              <div className="font-semibold mb-2">Open Questions</div>
              <div className="text-xs">How should the race condition be handled?</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomHero;
