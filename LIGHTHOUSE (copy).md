# Lighthouse CI Setup

This project includes Lighthouse CI for performance monitoring and budget enforcement.

## Configuration Files

- `lighthouserc.json` - Standard configuration with your requested budgets
- `lighthouserc.strict.json` - Strict configuration for production monitoring
- `scripts/lighthouse-test.js` - Custom script for testing against any URL

## Performance Budgets

### Required (Error Level)
- **Performance Score**: ≥ 85%
- **LCP (Largest Contentful Paint)**: ≤ 2.5s
- **CLS (Cumulative Layout Shift)**: ≤ 0.1
- **TTFB (Time to First Byte)**: ≤ 200ms

### Warnings
- **FCP (First Contentful Paint)**: ≤ 2.0s
- **FMP (First Meaningful Paint)**: ≤ 2.0s
- **Speed Index**: ≤ 3.0s
- **TBT (Total Blocking Time)**: ≤ 300ms
- **TTI (Time to Interactive)**: ≤ 3.0s

## Available Scripts

```bash
# Test against localhost (development)
npm run lighthouse:local

# Test against Vercel deployment
npm run lighthouse:vercel

# Run standard configuration
npm run lighthouse

# Run strict configuration (all errors)
npm run lighthouse:strict

# Test against custom URL
node scripts/lighthouse-test.js https://your-custom-url.com
```

## Usage Examples

### Development Testing
```bash
# Start your dev server
npm run dev

# In another terminal, run lighthouse tests
npm run lighthouse:local
```

### Production Testing
```bash
# Test against deployed Vercel site
npm run lighthouse:vercel
```

### CI/CD Integration
```bash
# Use in GitHub Actions or other CI
npm run lighthouse:strict
```

## Current Performance Issues

Based on initial testing, the following areas need optimization:

1. **Performance Score**: Currently ~48-71%, needs to reach 85%
2. **LCP**: Currently ~6-8s, needs to be ≤ 2.5s
3. **CLS**: Currently ~0.45-0.84, needs to be ≤ 0.1
4. **Image Optimization**: WebP images not being used effectively
5. **JavaScript Bundle**: Large unused JavaScript bundles

## Optimization Recommendations

1. **Image Optimization**:
   - Ensure all images are using WebP format
   - Implement proper image sizing and lazy loading
   - Use Next.js Image component with optimization

2. **Code Splitting**:
   - Implement dynamic imports for heavy components
   - Remove unused JavaScript
   - Optimize bundle size

3. **Performance**:
   - Implement proper caching strategies
   - Optimize CSS delivery
   - Minimize render-blocking resources

4. **Core Web Vitals**:
   - Optimize LCP by preloading critical images
   - Fix layout shifts by setting proper dimensions
   - Improve TTI by reducing JavaScript execution time

## Reports

Lighthouse CI generates detailed reports that are uploaded to temporary storage. Each run provides:
- Performance scores and metrics
- Specific recommendations for improvement
- Visual comparison between runs
- Detailed audit results

## Integration with Vercel

For automatic testing on Vercel deployments, add this to your `vercel.json`:

```json
{
  "buildCommand": "npm run build && npm run lighthouse:strict"
}
```

Or use Vercel's built-in Lighthouse integration in the dashboard.
