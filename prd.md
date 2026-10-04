# Product Requirement Document (PRD)

## Project Overview
**Platform Name:** Peer-to-Peer Mock Interview Matcher & Feedback Repository  
**Core Objective:** A credit-driven, reciprocal marketplace platform that connects technical candidates (Software Engineers, PMs, Data Scientists) for live, mutual interview practice with integrated workspace tooling and historical skill analytics.

---

## 1. Key User Personas
* **Candidate (Interviewee):** Job seeker looking for authentic, timed practice, structured technical and behavioral feedback, and long-term skill tracking without high coaching costs.
* **Peer (Interviewer):** Platform member looking to earn platform credits by conducting structured interviews, gaining interviewer-side perspective on hiring rubrics.
* **Platform Administrator:** Responsible for managing user karma, mitigating no-shows or low-effort feedback, and monitoring queue performance.

---

## 2. Core Functional Requirements

### A. Matchmaking & Scheduling Engine
* **Slot Availability:** Integrates with interactive calendar slots or external calendar APIs (Google Calendar, Calendly).
* **Multi-Attribute Matching Matrix:**
  * **Role & Domain:** Backend, Frontend, System Design, Data Structures & Algorithms, Behavioral (STAR method), PM Teardown.
  * **Seniority & Tier:** Entry, Mid, Senior, Staff+ paired across target company tiers (FAANG, High-Growth Startup, Enterprise).
  * **Language Preference:** Java, Python, C++, TypeScript/JavaScript, Go.
* **Reciprocal Credit Economy:**
  * **Initial Balance:** 2 starter credits upon onboarding.
  * **Earning Rate:** +1 Credit per completed 60-minute interview conducted + submitted feedback.
  * **Spending Rate:** -1 Credit per session booked as an interviewee.
  * **Penalty Logic:** -2 Credits and Karma rating deduction for no-shows or late cancellations (<2 hours prior).

### B. Live Dual-View Session Workspace
* **Interviewer View:** Problem prompt, test cases, progressive hints, hidden solution guide, and phase timers (5m Intro, 35m Practice, 5m Q&A, 15m Feedback).
* **Interviewee View:** Problem prompt, input/output constraints, example test cases, and execution surface.
* **Collaboration Tools:** Shared real-time code editor with sandboxed execution, and an interactive system architecture whiteboard.

### C. Feedback Repository & Skill Analytics
* **Multi-Dimensional Rubric (1–5 Scale):**
  1. Technical Correctness & Efficiency
  2. Problem Clarification & Edge-Case Handling
  3. Communication & Thought Process Transparency
  4. Behavioral / STAR Framework Execution
* **Qualitative Diagnostics:** Mandatory feedback fields for *Key Strengths* and *Areas for Growth*.
* **Progress Dashboard:** Radar skill maps, score trends over time, and persistent weak-spot alerts.

---

## 3. Non-Functional Requirements (NFRs)
* **Latency:** Real-time code/canvas sync $<50\text{ms}$; audio/video streaming $<150\text{ms}$.
* **Availability:** 99.9% operational uptime for the API gateway and Redis queue engine.
* **Security:** Tokenized, short-lived room URLs; isolated container sandboxing for execution; zero retention of live WebRTC media streams.

---

## 4. Key Metrics & KPIs

| Metric | Target | Measurement Method |
| :--- | :--- | :--- |
| **Match Success Rate** | $\ge 92\%$ | Percentage of session requests paired within 12 hours |
| **No-Show Rate** | $<3.5\%$ | Penalty-tracked missed bookings |
| **Feedback Completion** | $\ge 98\%$ | Submissions completed within 2 hours of session end |
| **7-Day Active Retention** | $\ge 45\%$ | Users returning to book or conduct a session weekly |