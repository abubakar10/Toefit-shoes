#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Fixing deprecated packages for ToeFit...');

// Set npm config to handle legacy peer dependencies
const npmConfigs = [
  'npm config set legacy-peer-deps true',
  'npm config set audit-level moderate',
  'npm config set fund false'
];

npmConfigs.forEach(config => {
  try {
    console.log(`⚙️  Setting: ${config}`);
    execSync(config, { stdio: 'pipe' });
  } catch (error) {
    console.warn(`Warning: Could not set ${config}`);
  }
});

// Update package.json to fix known deprecated packages
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Add resolutions for deprecated packages
if (!packageJson.resolutions) {
  packageJson.resolutions = {};
}

// Fix common deprecated packages
Object.assign(packageJson.resolutions, {
  "rollup-plugin-terser": "npm:@rollup/plugin-terser@^0.4.4",
  "babel-eslint": "npm:@babel/eslint-parser@^7.22.0",
  "uuid": "^9.0.0",
  "node-fetch": "^3.3.0"
});

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

console.log('✅ Updated package.json with deprecation fixes');

// Clear npm cache and reinstall
try {
  console.log('🧹 Clearing npm cache...');
  execSync('npm cache clean --force', { stdio: 'pipe' });
  
  console.log('📦 Installing packages with legacy peer deps...');
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  
  console.log('🔍 Running audit fix...');
  execSync('npm audit fix --legacy-peer-deps || true', { stdio: 'pipe' });
  
  console.log('✅ Deprecated packages fixed successfully!');
  console.log('🚀 Ready for deployment!');
  
} catch (error) {
  console.error('❌ Error during package installation:', error.message);
  console.log('💡 Try running manually: npm install --legacy-peer-deps');
}

// Reset npm configs (optional)
console.log('🔄 Resetting npm configs...');
try {
  execSync('npm config delete legacy-peer-deps', { stdio: 'pipe' });
  execSync('npm config delete audit-level', { stdio: 'pipe' });
  execSync('npm config delete fund', { stdio: 'pipe' });
} catch (error) {
  // Configs might not exist, that's okay
} 