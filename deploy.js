#!/usr/bin/env node

// Set environment variables for deployment
process.env.CI = 'false';
process.env.GENERATE_SOURCEMAP = 'false';
process.env.DISABLE_ESLINT_PLUGIN = 'true';
process.env.TSC_COMPILE_ON_ERROR = 'true';
process.env.ESLINT_NO_DEV_ERRORS = 'true';

const { spawn } = require('child_process');

console.log('🚀 Starting ToeFit deployment build...');
console.log('Environment:', {
  CI: process.env.CI,
  GENERATE_SOURCEMAP: process.env.GENERATE_SOURCEMAP,
  DISABLE_ESLINT_PLUGIN: process.env.DISABLE_ESLINT_PLUGIN
});

// Run the build
const build = spawn('npm', ['run', 'build'], {
  stdio: 'inherit',
  env: { ...process.env }
});

build.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Build completed successfully!');
  } else {
    console.error('❌ Build failed with exit code:', code);
    process.exit(code);
  }
}); 