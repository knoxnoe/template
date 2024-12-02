#!/usr/bin/env node

import { runCLI } from './lib/cli';

runCLI().catch((error) => {
  console.error('Error:', error);
  process.exit(1);
});
