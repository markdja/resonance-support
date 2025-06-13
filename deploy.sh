#!/bin/bash
echo "🧹 Cleaning up old placeholder files..."
rm -f WelcomeHall/invitation/index.html
rm -f SciencePark/labs/index.html

echo "📦 Unpacking update bundle..."
unzip -o update_bundle.zip -d .

echo "📂 Deploying updated scrolls and lab logs..."
cp -r update/WelcomeHall/invitation/index.html WelcomeHall/invitation/
cp -r update/SciencePark/labs/index.html SciencePark/labs/

echo "💾 Staging for Git..."
git add .
git commit -m "🌀 Deployed Scroll 004 and updated lab notes"
git push

echo "✅ Done! Because is purring in approval."
