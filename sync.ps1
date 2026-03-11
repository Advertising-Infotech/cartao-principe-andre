# sync.ps1 - Automatic GitHub Sync for cartao-principe-andre

$CommitMessage = "Final migration to static JSON translations and SEO: " + (Get-Date -Format "yyyy-MM-dd HH:mm:ss")

Write-Host "--- Starting GitHub Sync ---" -ForegroundColor Cyan

# Stage all changes (respecting .gitignore)
git add .

# Check if there are changes to commit
$status = git status --porcelain
if (-not $status) {
    Write-Host "No changes to sync." -ForegroundColor Yellow
    exit 0
}

# Commit
git commit -m $CommitMessage

# Push to main
Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Success! Project synced to GitHub." -ForegroundColor Green
} else {
    Write-Host "Error: Push failed. Check your connection or credentials." -ForegroundColor Red
}
