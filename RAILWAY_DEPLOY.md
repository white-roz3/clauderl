# Railway Deployment Guide for ClaudeRL

## Step 1: Deploy via Railway Dashboard

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Select your project**: "clauderl"
3. **Create a new service**:
   - Click "New" → "GitHub Repo"
   - Select repository: `white-roz3/clauderl`
   - Railway will auto-detect Next.js

4. **Wait for deployment** to complete

## Step 2: Add Custom Domain

1. **In your service settings**:
   - Click on your service
   - Go to "Settings" tab
   - Scroll to "Domains" section

2. **Add custom domain**:
   - Click "Add Custom Domain"
   - Enter: `clauderl.xyz`
   - Click "Add"

3. **Railway will provide DNS records** (see below)

## Step 3: Configure DNS Records

Railway will provide you with DNS records. Typically:

### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: @ (or clauderl.xyz)
Value: [Railway-provided CNAME target, e.g., your-app.up.railway.app]
TTL: 3600 (or Auto)
```

### Option B: A Records (If CNAME not supported at root)
Railway may provide A records if your registrar doesn't support CNAME at root:
```
Type: A
Name: @
Value: [Railway-provided IP addresses]
TTL: 3600
```

### For www subdomain (optional):
```
Type: CNAME
Name: www
Value: @ (or clauderl.xyz)
TTL: 3600
```

## Step 4: Update DNS at Your Registrar

1. **Log in to your domain registrar** (where you bought clauderl.xyz)
2. **Navigate to DNS management**
3. **Add the DNS records** provided by Railway
4. **Wait for DNS propagation** (usually 5-60 minutes)

## Step 5: Verify Deployment

Once DNS propagates:
- Visit: https://clauderl.xyz
- Railway automatically provisions SSL certificates

## Troubleshooting

- **If deployment fails**: Check Railway logs in the dashboard
- **If domain doesn't work**: Verify DNS records are correct
- **SSL issues**: Wait 5-10 minutes after DNS propagation for SSL to provision




## Step 1: Deploy via Railway Dashboard

1. **Go to Railway Dashboard**: https://railway.app/dashboard
2. **Select your project**: "clauderl"
3. **Create a new service**:
   - Click "New" → "GitHub Repo"
   - Select repository: `white-roz3/clauderl`
   - Railway will auto-detect Next.js

4. **Wait for deployment** to complete

## Step 2: Add Custom Domain

1. **In your service settings**:
   - Click on your service
   - Go to "Settings" tab
   - Scroll to "Domains" section

2. **Add custom domain**:
   - Click "Add Custom Domain"
   - Enter: `clauderl.xyz`
   - Click "Add"

3. **Railway will provide DNS records** (see below)

## Step 3: Configure DNS Records

Railway will provide you with DNS records. Typically:

### Option A: CNAME Record (Recommended)
```
Type: CNAME
Name: @ (or clauderl.xyz)
Value: [Railway-provided CNAME target, e.g., your-app.up.railway.app]
TTL: 3600 (or Auto)
```

### Option B: A Records (If CNAME not supported at root)
Railway may provide A records if your registrar doesn't support CNAME at root:
```
Type: A
Name: @
Value: [Railway-provided IP addresses]
TTL: 3600
```

### For www subdomain (optional):
```
Type: CNAME
Name: www
Value: @ (or clauderl.xyz)
TTL: 3600
```

## Step 4: Update DNS at Your Registrar

1. **Log in to your domain registrar** (where you bought clauderl.xyz)
2. **Navigate to DNS management**
3. **Add the DNS records** provided by Railway
4. **Wait for DNS propagation** (usually 5-60 minutes)

## Step 5: Verify Deployment

Once DNS propagates:
- Visit: https://clauderl.xyz
- Railway automatically provisions SSL certificates

## Troubleshooting

- **If deployment fails**: Check Railway logs in the dashboard
- **If domain doesn't work**: Verify DNS records are correct
- **SSL issues**: Wait 5-10 minutes after DNS propagation for SSL to provision


