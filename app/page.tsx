"use client";

import {useState} from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [previewUser, setPreviewUser] = useState("");

  return (
    <div
      className="flex flex-col flex-1 items-center justify-center bg-gradient-to-b from-[#0a3d6b] to-[#1e90ff] font-sans min-h-screen">
      <main className="flex flex-1 w-full max-w-2xl flex-col items-center gap-10 py-16 px-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            GitHub Aquarium
          </h1>
          <p className="mt-3 text-lg text-blue-100 opacity-80">
            GitHub 활동에 따라 살아 움직이는 물고기를 README에 넣어보세요
          </p>
        </div>

        {/* Live Preview */}
        {previewUser && (
          <div className="w-full rounded-xl overflow-hidden shadow-2xl border border-white/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/api/aquarium/${previewUser}`}
              alt={`${previewUser}'s aquarium`}
              width={400}
              height={200}
              className="w-full"
            />
          </div>
        )}

        {/* Username Input */}
        <div className="flex gap-3 w-full max-w-sm">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && username.trim() && setPreviewUser(username.trim())}
            placeholder="GitHub username"
            className="flex-1 rounded-lg px-4 py-2.5 bg-white/10 text-white placeholder-blue-200 border border-white/20 focus:outline-none focus:border-white/50 backdrop-blur-sm"
          />
          <button
            onClick={() => username.trim() && setPreviewUser(username.trim())}
            className="rounded-lg px-5 py-2.5 bg-white text-[#0a3d6b] font-semibold hover:bg-blue-50 transition-colors"
          >
            미리보기
          </button>
        </div>

        {/* States Table */}
        <div className="w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 overflow-hidden">
          <table className="w-full text-sm text-blue-50">
            <thead>
            <tr className="border-b border-white/10">
              <th className="px-5 py-3 text-left font-semibold">상태</th>
              <th className="px-5 py-3 text-left font-semibold">조건</th>
              <th className="px-5 py-3 text-left font-semibold">시각 표현</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b border-white/5">
              <td className="px-5 py-3 font-mono">active</td>
              <td className="px-5 py-3">24시간 이내 활동</td>
              <td className="px-5 py-3">빠르게 수영 (2s 주기)</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-5 py-3 font-mono">idle</td>
              <td className="px-5 py-3">1~3일 활동 없음</td>
              <td className="px-5 py-3">느리게 수영 (5s 주기)</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-mono">sleep</td>
              <td className="px-5 py-3">3일 이상 활동 없음</td>
              <td className="px-5 py-3">정지 + 투명도 감소</td>
            </tr>
            </tbody>
          </table>
        </div>

        {/* Usage */}
        <div className="w-full rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5">
          <h2 className="text-lg font-semibold text-white mb-3">사용법</h2>
          <p className="text-blue-100 text-sm mb-3">
            아래 마크다운을 README.md에 붙여넣으세요:
          </p>
          <code className="block bg-black/30 rounded-lg p-4 text-sm text-blue-100 font-mono break-all select-all">
            {`![GitHub Aquarium](https://gitquarium.vercel.app/api/aquarium/${previewUser})`}
          </code>
        </div>
      </main>
    </div>
  );
}
