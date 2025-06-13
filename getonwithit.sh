#!/bin/bash
set -e

echo "🚀 Starting the Resonance Domain update ritual…"

# 1. Pull down any new bundles or scripts pushed via GitHub
echo "🔄 Pulling latest changes from GitHub…"
git pull origin main

# 2. Ensure deploy script is executable
echo "🔧 Granting execute rights to deploy.sh…"
chmod +x deploy.sh

# 3. Unzip (and overwrite) the latest update_bundle.zip
echo "📦 Unpacking update_bundle.zip…"
unzip -o update_bundle.zip -d .

# 4. Run the deploy script to move files into place, clean up, and commit
echo "⚙️  Running deploy.sh to deploy scrolls, lab notes, etc…"
./deploy.sh

echo "✅ All done. Because is purring in approval."
