# Deployment Guide

## Deploying to GitHub Pages

### Option 1: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **The build output will be in the `/out` directory**

3. **Create a gh-pages branch**
   ```bash
   git checkout --orphan gh-pages
   git rm -rf .
   cp -r out/* .
   touch .nojekyll
   git add .
   git commit -m "Deploy to GitHub Pages"
   git push origin gh-pages
   ```

4. **Configure GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` / `/ (root)`
   - Save

### Option 2: GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './out'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: GitHub Actions

3. **Push to main branch**
   - The workflow will automatically build and deploy

### Option 3: Netlify/Vercel

**Vercel:**
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

**Netlify:**
1. Install Netlify CLI: `npm i -g netlify-cli`
2. Build: `npm run build`
3. Deploy: `netlify deploy --prod --dir=out`

## Testing Locally Before Deploying

To test the production build locally:

```bash
npm run build
npx serve out
```

Then open http://localhost:3000

## Troubleshooting

### 404 Errors on GitHub Pages

- Make sure `.nojekyll` file exists in root
- Check that base path is correct (should be `/` or your repo name)
- Verify file paths in GitHub Pages deployment

### Static Assets Not Loading

- Ensure all image paths are relative or use public folder
- Check that `next.config.js` has `images: { unoptimized: true }`
- Verify asset URLs in browser console

### Build Fails

- Clear `.next` folder: `rm -rf .next`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version (should be 18+)

## Custom Domain

1. Go to repository Settings → Pages
2. Add custom domain
3. Update DNS records (CNAME or A record)
4. Wait for DNS propagation (can take up to 24 hours)

## Performance Tips

- Enable compression on GitHub Pages (automatic)
- Use CDN for static assets
- Optimize images before deployment
- Monitor build size (should be < 10MB for optimal performance)
