# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

**GitHub Aquarium (gitquarium)** — GitHub 활동량에 따라 물고기 애니메이션이 변하는 SVG를 생성하는 Next.js 앱. 생성된 SVG를 GitHub README에 임베드하여 사용한다. Vercel에 배포됨.

## Commands

- `pnpm dev` — 개발 서버 실행
- `pnpm build` — 프로덕션 빌드
- `pnpm start` — 프로덕션 서버 실행
- `pnpm lint` — ESLint 실행

패키지 매니저는 **pnpm**을 사용한다.

## Architecture

### API 흐름

`GET /api/aquarium/[username]` → GitHub Events API에서 최근 활동 조회 → 물고기 상태 계산 → SVG 렌더링 후 응답

### 물고기 상태 (lib/state.ts, lib/types.ts)

| 상태 | 조건 | 설명 |
|------|------|------|
| ACTIVE | 최근 24시간 내 활동 | 빠른 수영, 물방울 5개 |
| IDLE | 1~3일 활동 없음 | 느린 수영, 물방울 2개 |
| SLEEP | 3일+ 활동 없음 | 정지, 물방울 없음 |

### SVG 렌더링 파이프라인 (lib/svg/)

- `compose.ts` — 400×200 SVG 조합 (배경 + 물고기 + 물방울)
- `fish.ts` — 물고기 본체, 지느러미, 꼬리 애니메이션
- `background.ts` — 바다 그라데이션, 해초 애니메이션
- `bubbles.ts` — 물방울 상승 애니메이션

### GitHub 연동 (lib/github.ts)

- `GITHUB_TOKEN` 환경변수로 인증 (없으면 비인증 요청, 낮은 rate limit)
- 캐싱: 성공 시 300s, 404는 3600s, 403(rate limit)은 600s, 기타 에러 60s

### 프론트엔드 (app/page.tsx)

유저네임 입력 → SVG 미리보기 → 마크다운 복사 기능 제공

## Tech Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Tailwind CSS 4 (PostCSS 플러그인), Vercel Analytics
- 테스트 프레임워크 미설정
