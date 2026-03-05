#!/bin/bash

# Quick Deployment Script for Plumbing Demo Website
# Run this script to create a deployment-ready package

echo "🚀 Preparing Plumbing Demo Website for Deployment..."

# Create deployment folder
mkdir -p ../deployment-ready/plumbing-demo

# Copy all files
cp index.html ../deployment-ready/plumbing-demo/
cp styles.css ../deployment-ready/plumbing-demo/
cp script.js ../deployment-ready/plumbing-demo/
cp README.md ../deployment-ready/plumbing-demo/

echo "✅ Files copied to deployment-ready folder"

# Create zip file for easy upload
cd ../deployment-ready
zip -r plumbing-demo-website.zip plumbing-demo/

echo "📦 Created plumbing-demo-website.zip"
echo ""
echo "🎯 Deployment Options:"
echo "1. Upload plumbing-demo-website.zip to Netlify Drop: https://netlify.com/drop"
echo "2. Extract and upload individual files to your web host"
echo "3. Open index.html locally for offline demos"
echo ""
echo "💡 Pro Tip: Change the phone number to (602) 555-DEMO for tracking demo calls!"

cd ../plumbing-demo