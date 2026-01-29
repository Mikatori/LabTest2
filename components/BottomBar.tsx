'use client';

import { useState } from 'react';
import { useLabStore } from '@/lib/store';
import { CONSTANTS, CHEMICAL_INFO, EQUIPMENT_INFO } from '@/lib/constants';

interface BottomBarProps {
  module: 'COD' | 'BOD';
  currentStep: number;
}

export default function BottomBar({ module, currentStep }: BottomBarProps) {
  const { measurements, hasGloves, hasGoggles, setMeasurement } = useLabStore();
  const [activeTab, setActiveTab] = useState<'inventory' | 'measurements'>('inventory');

  const renderInventory = () => {
    if (module === 'COD') {
      return (
        <div className="grid grid-cols-4 gap-4 h-full">
          {/* Chemicals */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">HÓA CHẤT</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CHEMICAL_INFO.K2CR2O7.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{CHEMICAL_INFO.K2CR2O7.name}</p>
                  <p className="text-xs text-gray-500">{CHEMICAL_INFO.K2CR2O7.concentration}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CHEMICAL_INFO.H2SO4_AG2SO4.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{CHEMICAL_INFO.H2SO4_AG2SO4.name}</p>
                  <p className="text-xs text-gray-500">H2SO4-Ag2SO4</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CHEMICAL_INFO.WATER_SAMPLE.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{CHEMICAL_INFO.WATER_SAMPLE.name}</p>
                  <p className="text-xs text-gray-500">Mẫu nước</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">DỤNG CỤ</h4>
            <div className="space-y-2">
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.PIPETTE.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.PIPETTE.capacity}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.BEAKER.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.BEAKER.capacity}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.COD_TUBE.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.COD_TUBE.capacity}</p>
              </div>
            </div>
          </div>

          {/* Instruments */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">THIẾT BỊ</h4>
            <div className="space-y-2">
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.HEATER.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.HEATER.range}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.SPECTROPHOTOMETER.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.SPECTROPHOTOMETER.range}</p>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">BẢO HỘ</h4>
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 rounded p-2 ${
                  hasGloves ? 'bg-green-600/30 border border-green-500' : 'bg-gray-800/50'
                }`}
              >
                <span className="text-lg">🧤</span>
                <p className="text-xs text-white">Găng tay</p>
                {hasGloves && <span className="text-xs text-green-400 ml-auto">✓</span>}
              </div>
              <div
                className={`flex items-center gap-2 rounded p-2 ${
                  hasGoggles ? 'bg-green-600/30 border border-green-500' : 'bg-gray-800/50'
                }`}
              >
                <span className="text-lg">🥽</span>
                <p className="text-xs text-white">Kính bảo hộ</p>
                {hasGoggles && <span className="text-xs text-green-400 ml-auto">✓</span>}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      // BOD Inventory
      return (
        <div className="grid grid-cols-4 gap-4 h-full">
          {/* Chemicals */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">HÓA CHẤT</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CHEMICAL_INFO.WATER_SAMPLE.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{CHEMICAL_INFO.WATER_SAMPLE.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CHEMICAL_INFO.NUTRIENT.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{CHEMICAL_INFO.NUTRIENT.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-800/50 rounded p-2">
                <div
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: CHEMICAL_INFO.MICROORGANISM.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white truncate">{CHEMICAL_INFO.MICROORGANISM.name}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">DỤNG CỤ</h4>
            <div className="space-y-2">
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.PIPETTE.name}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.BOD_BOTTLE.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.BOD_BOTTLE.capacity}</p>
              </div>
            </div>
          </div>

          {/* Instruments */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">THIẾT BỊ</h4>
            <div className="space-y-2">
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.INCUBATOR.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.INCUBATOR.range}</p>
              </div>
              <div className="bg-gray-800/50 rounded p-2">
                <p className="text-xs text-white">{EQUIPMENT_INFO.DO_METER.name}</p>
                <p className="text-xs text-gray-500">{EQUIPMENT_INFO.DO_METER.range}</p>
              </div>
            </div>
          </div>

          {/* Safety */}
          <div className="bg-gray-700/30 rounded-lg p-3">
            <h4 className="text-xs text-gray-400 mb-2">BẢO HỘ</h4>
            <div className="space-y-2">
              <div
                className={`flex items-center gap-2 rounded p-2 ${
                  hasGloves ? 'bg-green-600/30 border border-green-500' : 'bg-gray-800/50'
                }`}
              >
                <span className="text-lg">🧤</span>
                <p className="text-xs text-white">Găng tay</p>
                {hasGloves && <span className="text-xs text-green-400 ml-auto">✓</span>}
              </div>
              <div
                className={`flex items-center gap-2 rounded p-2 ${
                  hasGoggles ? 'bg-green-600/30 border border-green-500' : 'bg-gray-800/50'
                }`}
              >
                <span className="text-lg">🥽</span>
                <p className="text-xs text-white">Kính bảo hộ</p>
                {hasGoggles && <span className="text-xs text-green-400 ml-auto">✓</span>}
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  const renderMeasurements = () => {
    return (
      <div className="h-full overflow-y-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* Current Measurements */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-sm text-gray-400 mb-3">ĐO LƯỜNG HIỆN TẠI</h4>
            <div className="space-y-3">
              {module === 'COD' ? (
                <>
                  {measurements.volume !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Thể tích mẫu:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.volume.toFixed(1)} ml
                      </span>
                    </div>
                  )}
                  {measurements.k2cr2o7Volume !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">K₂Cr₂O₇:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.k2cr2o7Volume.toFixed(1)} ml
                      </span>
                    </div>
                  )}
                  {measurements.h2so4Volume !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">H₂SO₄-Ag₂SO₄:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.h2so4Volume.toFixed(1)} ml
                      </span>
                    </div>
                  )}
                  {measurements.temperature !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Nhiệt độ:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.temperature.toFixed(0)}°C
                      </span>
                    </div>
                  )}
                  {measurements.absorbance !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Absorbance:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.absorbance.toFixed(3)}
                      </span>
                    </div>
                  )}
                  {measurements.cod !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">COD:</span>
                      <span className="text-sm text-green-400 font-mono font-bold">
                        {measurements.cod.toFixed(1)} mg/L
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {measurements.bodVolume !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Thể tích BOD:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.bodVolume.toFixed(0)} ml
                      </span>
                    </div>
                  )}
                  {measurements.do0 !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">DO ban đầu:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.do0.toFixed(1)} mg/L
                      </span>
                    </div>
                  )}
                  {measurements.do5 !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">DO sau 5 ngày:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.do5.toFixed(1)} mg/L
                      </span>
                    </div>
                  )}
                  {measurements.incubatorTemperature !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Nhiệt độ ủ:</span>
                      <span className="text-sm text-white font-mono">
                        {measurements.incubatorTemperature.toFixed(0)}°C
                      </span>
                    </div>
                  )}
                  {measurements.bod5 !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">BOD₅:</span>
                      <span className="text-sm text-green-400 font-mono font-bold">
                        {measurements.bod5.toFixed(1)} mg/L
                      </span>
                    </div>
                  )}
                </>
              )}

              {Object.keys(measurements).length === 0 && (
                <p className="text-xs text-gray-500 italic">Chưa có đo lường nào</p>
              )}
            </div>
          </div>

          {/* Status Indicators */}
          <div className="bg-gray-700/30 rounded-lg p-4">
            <h4 className="text-sm text-gray-400 mb-3">TRẠNG THÁI</h4>
            <div className="space-y-3">
              {measurements.isCapped !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Đã đậy nắp:</span>
                  <span
                    className={`text-xs font-semibold ${
                      measurements.isCapped ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {measurements.isCapped ? '✓ Có' : '✗ Chưa'}
                  </span>
                </div>
              )}
              {measurements.isShaken !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Đã lắc:</span>
                  <span
                    className={`text-xs font-semibold ${
                      measurements.isShaken ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {measurements.isShaken ? '✓ Có' : '✗ Chưa'}
                  </span>
                </div>
              )}
              {measurements.heatingComplete !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Đun hoàn tất:</span>
                  <span
                    className={`text-xs font-semibold ${
                      measurements.heatingComplete ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {measurements.heatingComplete ? '✓ Xong' : '⏳ Đang đun'}
                  </span>
                </div>
              )}
              {measurements.incubationComplete !== undefined && (
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Ủ hoàn tất:</span>
                  <span
                    className={`text-xs font-semibold ${
                      measurements.incubationComplete ? 'text-green-400' : 'text-yellow-400'
                    }`}
                  >
                    {measurements.incubationComplete ? '✓ Xong' : '⏳ Đang ủ'}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-full w-full bg-gray-900 text-white p-4">
      {/* Tabs */}
      <div className="flex gap-4 mb-3">
        <button
          onClick={() => setActiveTab('inventory')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'inventory'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
          }`}
        >
          📦 Kho đồ
        </button>
        <button
          onClick={() => setActiveTab('measurements')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'measurements'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
          }`}
        >
          📊 Đo lường
        </button>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-40px)]">{activeTab === 'inventory' ? renderInventory() : renderMeasurements()}</div>
    </div>
  );
}
