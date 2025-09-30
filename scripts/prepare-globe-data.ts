import fs from 'fs';
import Papa from 'papaparse';

// Top 20 data center cities (covers 90% of global cloud capacity)
const DATACENTER_CITIES: Record<string, Array<{
  city: string;
  lat: number;
  lng: number;
  providers: string[];
}>> = {
  "Ireland": [{ city: "Dublin", lat: 53.3498, lng: -6.2603, providers: ["AWS", "Azure", "GCP", "Oracle"] }],
  "Germany": [
    { city: "Frankfurt", lat: 50.1109, lng: 8.6821, providers: ["AWS", "Azure", "GCP", "Alibaba"] },
    { city: "Berlin", lat: 52.5200, lng: 13.4050, providers: ["Hetzner"] }
  ],
  "United States": [
    { city: "Ashburn (Virginia)", lat: 39.0438, lng: -77.4874, providers: ["AWS", "Azure", "Oracle"] },
    { city: "Silicon Valley", lat: 37.3861, lng: -122.0839, providers: ["GCP", "AWS"] },
    { city: "Dallas", lat: 32.7767, lng: -96.7970, providers: ["Azure", "IBM"] }
  ],
  "Singapore": [{ city: "Singapore", lat: 1.3521, lng: 103.8198, providers: ["AWS", "Azure", "GCP", "Alibaba"] }],
  "Japan": [
    { city: "Tokyo", lat: 35.6762, lng: 139.6503, providers: ["AWS", "Azure", "GCP", "Alibaba"] },
    { city: "Osaka", lat: 34.6937, lng: 135.5023, providers: ["AWS", "Azure"] }
  ],
  "United Kingdom": [{ city: "London", lat: 51.5074, lng: -0.1278, providers: ["AWS", "Azure", "GCP", "Oracle"] }],
  "France": [{ city: "Paris", lat: 48.8566, lng: 2.3522, providers: ["AWS", "Azure", "GCP"] }],
  "Netherlands": [{ city: "Amsterdam", lat: 52.3676, lng: 4.9041, providers: ["AWS", "Azure", "GCP"] }],
  "Australia": [{ city: "Sydney", lat: -33.8688, lng: 151.2093, providers: ["AWS", "Azure", "GCP", "Oracle"] }],
  "Brazil": [{ city: "São Paulo", lat: -23.5505, lng: -46.6333, providers: ["AWS", "Azure", "GCP", "Oracle"] }],
  "India": [
    { city: "Mumbai", lat: 19.0760, lng: 72.8777, providers: ["AWS", "Azure", "GCP"] },
    { city: "Hyderabad", lat: 17.3850, lng: 78.4867, providers: ["Azure"] }
  ],
  "Canada": [
    { city: "Toronto", lat: 43.6532, lng: -79.3832, providers: ["AWS", "Azure", "GCP", "Oracle"] },
    { city: "Montreal", lat: 45.5017, lng: -73.5673, providers: ["Azure"] }
  ],
  "South Korea": [{ city: "Seoul", lat: 37.5665, lng: 126.9780, providers: ["AWS", "Azure", "GCP", "Oracle"] }],
  "Sweden": [{ city: "Stockholm", lat: 59.3293, lng: 18.0686, providers: ["Azure"] }],
  "Switzerland": [{ city: "Zurich", lat: 47.3769, lng: 8.5417, providers: ["AWS", "Azure", "GCP"] }],
  "United Arab Emirates": [{ city: "Dubai", lat: 25.2048, lng: 55.2708, providers: ["AWS", "Azure", "Oracle"] }],
  "South Africa": [{ city: "Johannesburg", lat: -26.2041, lng: 28.0473, providers: ["Azure"] }],
  "Poland": [{ city: "Warsaw", lat: 52.2297, lng: 21.0122, providers: ["AWS", "Azure"] }],
  "Italy": [{ city: "Milan", lat: 45.4642, lng: 9.1900, providers: ["AWS", "Azure", "GCP"] }]
};

async function transformData() {
  // Check if CSV or JSON
  const files = fs.readdirSync('./public/data/');
  const dataFile = files.find(f => f.includes('datacenter') || f.includes('data_center') || f.includes('Book1'));
  
  if (!dataFile) {
    console.error('❌ No datacenter file found in /public/data/');
    return;
  }

  console.log(`📁 Processing file: ${dataFile}`);

  const rawData = fs.readFileSync(`./public/data/${dataFile}`, 'utf8');
  const parsed = dataFile.endsWith('.json') 
    ? JSON.parse(rawData)
    : Papa.parse(rawData, { header: true }).data;

  const globeData = {
    dataCenters: [] as any[],
    metadata: {
      totalPowerMW: 0,
      avgRenewable: 0,
      lastUpdated: new Date().toISOString()
    }
  };

  // Process each row from the CSV/JSON
  parsed.forEach((row: any) => {
    const country = row.country;
    const cities = DATACENTER_CITIES[country];
    
    if (cities) {
      cities.forEach(city => {
        // Parse power capacity (remove ~ and + symbols)
        const powerStr = row.power_capacity_MW_total || '0';
        const power = parseFloat(powerStr.replace(/[~+]/g, '')) || 0;
        
        // Parse renewable percentage (remove % symbol)
        const renewableStr = row.average_renewable_energy_usage_percent || '0';
        const renewable = parseFloat(renewableStr.replace(/[%~]/g, '')) || 0;
        
        // Parse hyperscale count (remove + symbol)
        const hyperscaleStr = row.hyperscale_data_centers || '0';
        const hyperscale = parseInt(hyperscaleStr.replace(/[+]/g, '')) || 0;
        
        // Parse cloud providers from the cloud_provider column
        const cloudProviderStr = row.cloud_provider || '';
        const providers = city.providers.filter(p => {
          const regex = new RegExp(`${p}:Yes`, 'i');
          return regex.test(cloudProviderStr);
        });
        
        globeData.dataCenters.push({
          lat: city.lat,
          lng: city.lng,
          label: `${city.city}, ${country}`,
          energy: power,
          renewable: renewable,
          providers: providers,
          hyperscale: hyperscale,
          tier: row.tier_distribution || "Unknown",
          totalDataCenters: parseInt(row.total_data_centers || '0') || 0,
          floorSpace: row.floor_space_sqft_total || '0',
          growthRate: parseFloat(row.growth_rate_of_data_centers_percent_per_year || '0') || 0
        });
      });
    }
  });

  // Calculate metadata
  globeData.metadata.totalPowerMW = globeData.dataCenters.reduce((sum, dc) => sum + dc.energy, 0);
  globeData.metadata.avgRenewable = globeData.dataCenters.length > 0 
    ? globeData.dataCenters.reduce((sum, dc) => sum + dc.renewable, 0) / globeData.dataCenters.length 
    : 0;

  // Write processed data
  fs.writeFileSync('./public/data/globe-datacenters-processed.json', JSON.stringify(globeData, null, 2));
  console.log(`✅ Processed ${globeData.dataCenters.length} data centers`);
  console.log(`📊 Total capacity: ${globeData.metadata.totalPowerMW.toFixed(0)} MW`);
  console.log(`🌱 Avg renewable: ${globeData.metadata.avgRenewable.toFixed(1)}%`);
  console.log(`💾 Saved to: ./public/data/globe-datacenters-processed.json`);
}

transformData().catch(console.error);
