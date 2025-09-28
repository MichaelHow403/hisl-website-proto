# News Feed Configuration

## Live Grok-Powered News Feed

The `/news` page features a live news feed powered by Grok's news API. When properly configured, it displays real-time AI and technology news.

### Setup

1. **Get a Grok API Key:**
   - Visit [https://console.x.ai/](https://console.x.ai/)
   - Sign up for an account
   - Generate an API key

2. **Configure Environment Variable:**
   ```bash
   # Add to .env.local
   GROK_API_KEY=your_grok_api_key_here
   ```

3. **Restart Development Server:**
   ```bash
   npm run dev
   ```

### Features

- **Live News Feed:** Real-time AI and technology news
- **Graceful Fallback:** Shows fallback content when API key is missing
- **Caching:** 5-minute cache for optimal performance
- **Error Handling:** Robust error handling with user-friendly messages
- **Responsive Design:** Mobile-friendly news cards

### API Endpoints

- `GET /api/news/grok?q=topic&limit=10` - Fetch news articles
- `GET /news` - News page with live feed

### Fallback Behavior

When `GROK_API_KEY` is not configured:
- Shows "Live feed currently unavailable" message
- Displays static curated content
- Logs helpful setup instructions in development mode

### Development

The news feed will automatically show fallback content in development when the API key is missing, with helpful console warnings for setup.
