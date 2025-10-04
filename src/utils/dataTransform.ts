// utils/dataTransform.ts (For CSV integration)
// npm install papaparse @types/papaparse
import Papa from 'papaparse';

// Hardcoded country centroids (offline, from public sources like country-codes-lat-long)
const countryCoords: Record<string, { lat: number; lng: number }> = {
  'USA': { lat: 37.0902, lng: -95.7129 },
  'UK': { lat: 55.3781, lng: -3.4360 },
  'France': { lat: 46.2276, lng: 2.2137 },
  'Australia': { lat: -25.2744, lng: 133.7751 },
  'Germany': { lat: 51.1657, lng: 10.4515 },
  'Japan': { lat: 36.2048, lng: 138.2529 },
  'Canada': { lat: 56.1304, lng: -106.3468 },
  'Brazil': { lat: -14.2350, lng: -51.9253 },
  'India': { lat: 20.5937, lng: 78.9629 },
  'China': { lat: 35.8617, lng: 104.1954 },
  'Singapore': { lat: 1.3521, lng: 103.8198 },
  'Netherlands': { lat: 52.1326, lng: 5.2913 },
  'Sweden': { lat: 60.1282, lng: 18.6435 },
  'Switzerland': { lat: 46.8182, lng: 8.2275 },
  'UAE': { lat: 23.4241, lng: 53.8478 },
  'South Africa': { lat: -30.5595, lng: 22.9375 },
  'Poland': { lat: 51.9194, lng: 19.1451 },
  'Italy': { lat: 41.8719, lng: 12.5674 },
  'South Korea': { lat: 35.9078, lng: 127.7669 },
  'Ireland': { lat: 53.4129, lng: -8.2439 },
  // Load full from JSON import or fetch('/data/countries.json')
};

// Transform CSV to JSON for globe
export const transformCSVToDataCenters = (csvText: string): { dataCenters: any[]; arcs: any[] } => {
  const parsed = Papa.parse(csvText, { header: true }).data as {
    Country: string;
    Power_Capacity_MW: number;
    Renewable_Energy_: number;
    Providers: string; // e.g., "AWS,Azure"
  }[];

  const dataCenters = parsed
    .filter(row => row.Country && countryCoords[row.Country])
    .map(row => {
      const coords = countryCoords[row.Country];
      const providers = row.Providers ? row.Providers.split(',').map(p => p.trim()) : [];
      const energy = row.Power_Capacity_MW * 1000; // MW to kWh est. (simplified)
      return {
        lat: coords.lat,
        lng: coords.lng,
        label: row.Country,
        energy,
        providers,
        renewable: row.Renewable_Energy_,
      };
    });

  return { dataCenters, arcs: [] }; // No arcs for now
};



