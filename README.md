# 🪶 Mini-Platform

> React.js + Node.js + MySQL 기반의 풀스택 웹서비스 플랫폼  
> 사용자 인증, 게시글·댓글 CRUD, 다크모드, 반응형 UI를 포함한 개인 프로젝트입니다.

---

## 🚀 배포 링크

- **Frontend:** [https://92355.github.io/oojinwoo-front-main](https://92355.github.io/oojinwoo-front-main/)

---

## 📖 프로젝트 개요

**Mini-Platform**은 React와 Node.js를 활용해 제작한  
**간단한 커뮤니티형 웹서비스**입니다.  
사용자는 회원가입·로그인 후 게시글과 댓글을 작성할 수 있으며,  
관리자는 모든 게시글/댓글을 관리할 수 있습니다.  

이 프로젝트를 통해 **프론트-백엔드 연동 구조, JWT 인증, REST API 설계, 배포 파이프라인**을 직접 경험했습니다.

---

## 🧩 주요 기능 (Frontend 중심)

| 기능 | 설명 |
|------|------|
| 🔐 **회원가입 / 로그인 / 로그아웃** | JWT 기반 인증, localStorage 저장, 로그인 상태 이벤트(`userChange`) 실시간 반영 |
| 📰 **게시글 목록 / 상세보기** | API를 통한 게시글 불러오기, 동적 URL(`useParams`) |
| ✏️ **게시글 작성 / 수정 / 삭제** | 로그인 상태에 따라 작성 가능, 관리자는 전체 수정/삭제 |
| 💬 **댓글 CRUD** | 게시글 상세에서 댓글 작성·삭제 가능 |
| 🌙 **다크 / 라이트 테마 전환** | `useTheme` 훅 + CSS 변수 기반 |
| 🧭 **라우팅 및 접근 제어** | `React Router (HashRouter)` + `AuthRoute` |
| 📱 **반응형 UI** | PC·모바일 모두 대응, sticky Header, hover 효과 |

---
