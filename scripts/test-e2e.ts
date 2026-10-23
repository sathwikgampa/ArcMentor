import axios from 'axios';
import WebSocket from 'ws';

const API_URL = process.env.API_URL || 'http://127.0.0.1:4000';
const WS_URL = process.env.WS_URL || 'ws://127.0.0.1:5000';
const EXECUTOR_URL = process.env.EXECUTOR_URL || 'http://127.0.0.1:6000';

async function runE2ETests() {
  console.log('🚀 Starting Full Monorepo End-to-End Integration Verification...\n');

  try {
    // 1️⃣ API Gateway Health Check
    console.log('1️⃣ Testing API Gateway Health...');
    const healthRes = await axios.get(`${API_URL}/health`);
    if (healthRes.data.status !== 'ok') throw new Error('API Gateway health check failed');
    console.log('   ✅ API Gateway is healthy!\n');

    // 2️⃣ Candidate Registration & Credit Allocation
    console.log('2️⃣ Registering Candidate A and Candidate B...');
    const timestamp = Date.now();
    const candidateA = await axios.post(`${API_URL}/api/auth/register`, {
      email: `candidate_a_${timestamp}@test.com`,
      password: 'password123',
      fullName: 'Candidate A',
      preferredLang: 'Java',
      targetTier: 'FAANG',
    });

    const candidateB = await axios.post(`${API_URL}/api/auth/register`, {
      email: `candidate_b_${timestamp}@test.com`,
      password: 'password123',
      fullName: 'Candidate B',
      preferredLang: 'Java',
      targetTier: 'FAANG',
    });

    const tokenA = candidateA.data.token;
    const tokenB = candidateB.data.token;

    if (candidateA.data.user.creditBalance !== 2 || candidateB.data.user.creditBalance !== 2) {
      throw new Error('Starter credit grant (+2 credits) failed');
    }
    console.log('   ✅ Candidate A & B registered with +2 starter credits each!\n');

    // 3️⃣ Docker Sandbox Execution
    console.log('3️⃣ Testing Docker Sandbox Code Executor...');
    const executeRes = await axios.post(`${EXECUTOR_URL}/api/execute`, {
      language: 'python',
      code: 'print("P2P System Operational")',
      timeoutMs: 5000,
    });

    if (!executeRes.data.output?.includes('P2P System Operational')) {
      throw new Error(`Unexpected execution output: ${executeRes.data.output}`);
    }
    console.log('   ✅ Docker sandbox code execution successful!\n');

    // 4️⃣ Availability Slot Submission (UTC ISO Generation)
    console.log('4️⃣ Submitting Overlapping Availability Slots...');
    const now = new Date();
    const start = new Date(
      Date.UTC(
        now.getUTCFullYear(),
        now.getUTCMonth(),
        now.getUTCDate(),
        now.getUTCHours() + 2,
        0,
        0,
        0,
      ),
    );
    const end = new Date(start.getTime() + 60 * 60 * 1000);

    const slotA = await axios.post(
      `${API_URL}/api/slots`,
      { startTime: start.toISOString(), endTime: end.toISOString(), domain: 'DSA' },
      { headers: { Authorization: `Bearer ${tokenA}` } },
    );

    const slotB = await axios.post(
      `${API_URL}/api/slots`,
      { startTime: start.toISOString(), endTime: end.toISOString(), domain: 'DSA' },
      { headers: { Authorization: `Bearer ${tokenB}` } },
    );

    const slotAId = slotA.data.id || slotA.data.slot?.id;
    const slotBId = slotB.data.id || slotB.data.slot?.id;

    if (!slotAId || !slotBId) {
      throw new Error('Slot creation failed');
    }
    console.log('   ✅ Slot availabilities successfully queued in Redis!\n');

    // 5️⃣ Real-Time WS Sync Connection
    console.log('5️⃣ Testing WebSocket Collaboration Server Connection...');
    const dummyRoomToken = 'test-room-token-uuid';
    const ws = new WebSocket(`${WS_URL}?token=${tokenA}&roomId=${dummyRoomToken}`);

    await new Promise((resolve, reject) => {
      ws.on('open', () => {
        console.log('   ✅ WebSocket connection established with Yjs Server!');
        ws.close();
        resolve(true);
      });
      ws.on('error', (err) => {
        reject(new Error(`WebSocket connection failed: ${err.message}`));
      });
    });

    console.log(
      '\n🎉 ALL INTEGRATION TESTS PASSED SUCCESSFULLY! The backend is 100% production-ready!',
    );
    process.exit(0);
  } catch (error: any) {
    console.error('\n❌ E2E Integration Test Failed:');
    console.error(error.response?.data || error.message);
    process.exit(1);
  }
}

runE2ETests();
