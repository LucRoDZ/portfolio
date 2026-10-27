import type { NextConfig } from 'next';
import { securityHeaders } from './lib/security';

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Self-contained server in .next/standalone for the Docker image (see Dockerfile).
  output: 'standalone',
  // Not needed at runtime: no next/image (sharp) and the config is pre-compiled (typescript). Saves ~50 MB.
  outputFileTracingExcludes: {
    '*': ['node_modules/@img/**', 'node_modules/sharp/**', 'node_modules/typescript/**'],
  },
  poweredByHeader: false,
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders(process.env) }];
  },
};

export default nextConfig;
