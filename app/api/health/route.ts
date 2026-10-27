/** Liveness probe for the Docker HEALTHCHECK and deploy.sh. Never cached. */
export const dynamic = 'force-dynamic';

export function GET() {
  return Response.json(
    { status: 'ok', revision: process.env.GIT_SHA ?? 'unknown' },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
