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
              <th className="px-5 py-3 text-left font-semibold">커밋 수 (3일)</th>
              <th className="px-5 py-3 text-left font-semibold">수영 속도</th>
              <th className="px-5 py-3 text-left font-semibold">시각 표현</th>
            </tr>
            </thead>
            <tbody>
            <tr className="border-b border-white/5">
              <td className="px-5 py-3 font-mono">10+</td>
              <td className="px-5 py-3">2s 주기</td>
              <td className="px-5 py-3">최고 속도, 물방울 8개</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-5 py-3 font-mono">5</td>
              <td className="px-5 py-3">12s 주기</td>
              <td className="px-5 py-3">중간 속도, 물방울 4개</td>
            </tr>
            <tr className="border-b border-white/5">
              <td className="px-5 py-3 font-mono">1</td>
              <td className="px-5 py-3">20s 주기</td>
              <td className="px-5 py-3">느린 속도, 물방울 1개</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-mono">0</td>
              <td className="px-5 py-3">정지</td>
              <td className="px-5 py-3">수면 상태, 투명도 감소</td>
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
