# System Design Interview Problems

## Problem Categories
Each system design problem includes:
- Problem statement & scale requirements
- Interviewer solution guide with architecture diagrams
- Progressive hints (3 stages)
- Evaluation rubric specific to system design

---

## Distributed Systems

### 1. URL Shortener (e.g., bit.ly)
- **Scale:** 100M URLs/day, <100ms redirect latency
- **Key Topics:** Hashing, base62 encoding, read-heavy caching, database sharding
- **Architecture:** Client → Load Balancer → API Server → Cache (Redis) → Database (PostgreSQL)

### 2. Chat Messaging System (e.g., WhatsApp)
- **Scale:** 50M daily active users, <200ms message delivery
- **Key Topics:** WebSocket connections, message queues, read receipts, group messaging
- **Architecture:** Client → WebSocket Gateway → Message Queue → Storage → Notification Service

### 3. News Feed / Timeline (e.g., Twitter)
- **Scale:** 300M users, 600 tweets/sec, fan-out on write vs read
- **Key Topics:** Fan-out strategies, timeline caching, ranking algorithms
- **Architecture:** Write Path (Fan-out Service → Redis Cache) | Read Path (Timeline Service → Cache)

---

## Data-Intensive Applications

### 4. Rate Limiter
- **Scale:** 10K requests/sec per user
- **Key Topics:** Token bucket, sliding window, distributed rate limiting
- **Architecture:** API Gateway → Redis (sorted sets) → Backend Services

### 5. Web Crawler
- **Scale:** 1 billion pages/month
- **Key Topics:** BFS crawling, URL frontier, politeness policy, deduplication
- **Architecture:** URL Frontier → Fetcher Pool → Parser → Content Store → URL Extractor

---

## Evaluation Rubric (System Design Specific)

| Dimension | 1 (Poor) | 3 (Average) | 5 (Excellent) |
| :--- | :--- | :--- | :--- |
| Requirements Gathering | No clarifying questions | Some clarifications | Thorough constraints & scale analysis |
| High-Level Design | Missing key components | Covers basics | Complete, well-reasoned architecture |
| Deep Dive | Surface-level only | Explores one area | Deep analysis of trade-offs |
| Scalability | Ignores bottlenecks | Identifies some issues | Proactive scaling strategies |
| Communication | Disorganized | Structured but gaps | Clear, confident, iterative |
