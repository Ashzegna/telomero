#!/bin/bash

echo "🔍 Checking current status..."

# Показываем текущую ветку
echo "📍 Current branch:"
git branch --show-current

echo ""
echo "📋 Recent commits in current branch:"
git log --oneline -5

echo ""
echo "🔄 Switching to main to check status..."
git checkout main

echo ""
echo "📋 Recent commits in main:"
git log --oneline -5

echo ""
echo "🔍 Checking if TypeScript fix is in main..."
git log --oneline -10 | grep -i "typescript\|fix\|error" || echo "❌ TypeScript fix not found in main"

echo ""
echo "🔄 Going back to feature branch..."
git checkout feature/calories-and-ui-simplification

echo ""
echo "🔍 Checking if TypeScript fix is in feature branch..."
git log --oneline -10 | grep -i "typescript\|fix\|error" || echo "❌ TypeScript fix not found in feature branch"

echo ""
echo "📊 Files that were changed:"
git diff --name-only main

echo ""
echo "🎯 NEXT STEPS:"
echo "1. If TypeScript fix is missing, we need to commit it first"
echo "2. Then merge to main"
echo "3. Then push to trigger new deployment"
