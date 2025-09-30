interface EnergyBadgeProps {
  energyKwh: number;
  co2Kg: number;
  renewablePercent: number;
}

export default function EnergyBadge({ energyKwh, co2Kg, renewablePercent }: EnergyBadgeProps) {
  return (
    <div className="bg-panel/90 backdrop-blur border border-edge rounded-xl p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Energy Metric */}
        <div className="text-center">
          <div className="text-sm text-muted mb-1">⚡ Energy</div>
          <div className="text-2xl font-semibold text-text">
            {energyKwh.toFixed(2)} kWh
          </div>
        </div>

        {/* CO₂e Metric */}
        <div className="text-center">
          <div className="text-sm text-muted mb-1">🌱 CO₂e</div>
          <div className="text-2xl font-semibold text-text">
            {co2Kg.toFixed(3)} kg
          </div>
        </div>

        {/* Renewable Metric */}
        <div className="text-center">
          <div className="text-sm text-muted mb-1">🔋 Renewable</div>
          <div className={`text-2xl font-semibold ${
            renewablePercent > 50 ? 'text-aiGreen' : 'text-brandGold'
          }`}>
            {renewablePercent.toFixed(1)}%
          </div>
        </div>
      </div>
    </div>
  );
}

