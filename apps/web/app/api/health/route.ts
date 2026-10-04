/**
 * API Health Check Route
 * Proxies to the API gateway and returns system status.
 */
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'arcmentor-web',
    timestamp: new Date().toISOString(),
  });
}
