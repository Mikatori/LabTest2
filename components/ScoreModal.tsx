'use client';

import { useLabStore } from '@/lib/store';
import { motion } from 'framer-motion';
import { CONSTANTS } from '@/lib/constants';

interface ScoreModalProps {
  score: {
    accuracy: number;
    safety: number;
    efficiency: number;
    total: number;
  };
  module: 'COD' | 'BOD';
  onClose: () => void;
  onRetry: () => void;
}

export default function ScoreModal({ score, module, onClose, onRetry }: ScoreModalProps) {
  const { errors, elapsedTime } = useLabStore();

  const getScoreColor = (value: number) => {
    if (value >= 35) return 'text-green-400';
    if (value >= 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGrade = () => {
    if (score.total >= 90) return { grade: 'Xuất sắc', color: 'text-purple-400', icon: '🏆' };
    if (score.total >= 80) return { grade: 'Giỏi', color: 'text-green-400', icon: '🌟' };
    if (score.total >= 70) return { grade: 'Khá', color: 'text-blue-400', icon: '👍' };
    if (score.total >= 60) return { grade: 'Trung bình', color: 'text-yellow-400', icon: '📝' };
    return { grade: 'Cần cố gắng', color: 'text-red-400', icon: '💪' };
  };

  const gradeInfo = getGrade();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins} phút ${secs} giây`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-blue-500 rounded-2xl shadow-2xl max-w-2xl w-full relative overflow-hidden"
      >
        {/* Decorative top bar */}
        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full" />

        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="text-6xl mb-4"
            >
              {gradeInfo.icon}
            </motion.div>
            <h2 className="text-3xl font-bold text-white mb-2">
              Hoàn thành {module === 'COD' ? 'COD' : 'BOD'}!
            </h2>
            <p className={`text-2xl font-bold ${gradeInfo.color}`}>{gradeInfo.grade}</p>
          </div>

          {/* Total Score */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 rounded-xl p-6 mb-6">
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-2">TỔNG ĐIỂM</p>
              <motion.p
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
                className={`text-6xl font-bold ${getScoreColor(score.total)}`}
              >
                {score.total.toFixed(1)}
              </motion.p>
              <p className="text-gray-500 text-sm mt-1">/ 100 điểm</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {/* Accuracy */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-2">🎯 CHÍNH XÁC</p>
                <p className={`text-2xl font-bold ${getScoreColor(score.accuracy)}`}>
                  {score.accuracy.toFixed(1)}
                </p>
                <div className="mt-2 bg-gray-600 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score.accuracy / 40) * 100}%` }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="bg-blue-500 h-full"
                  />
                </div>
              </div>
            </div>

            {/* Safety */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-2">⚡ AN TOÀN</p>
                <p className={`text-2xl font-bold ${getScoreColor(score.safety)}`}>
                  {score.safety.toFixed(1)}
                </p>
                <div className="mt-2 bg-gray-600 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score.safety / 30) * 100}%` }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="bg-green-500 h-full"
                  />
                </div>
              </div>
            </div>

            {/* Efficiency */}
            <div className="bg-gray-700/30 rounded-lg p-4">
              <div className="text-center">
                <p className="text-gray-400 text-xs mb-2">⏱️ HIỆU QUẢ</p>
                <p className={`text-2xl font-bold ${getScoreColor(score.efficiency)}`}>
                  {score.efficiency.toFixed(1)}
                </p>
                <div className="mt-2 bg-gray-600 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(score.efficiency / 30) * 100}%` }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="bg-purple-500 h-full"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Completion Time */}
          <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <p className="text-white text-sm font-semibold">Thời gian hoàn thành</p>
                  <p className="text-gray-400 text-xs">
                    Thời gian kỳ vọng: {module === 'COD' ? '20' : '15'} phút
                  </p>
                </div>
              </div>
              <p className="text-xl font-bold text-blue-400">{formatTime(elapsedTime)}</p>
            </div>
          </div>

          {/* Errors Summary */}
          {errors.length > 0 && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⚠️</span>
                <p className="text-white text-sm font-semibold">Lỗi đã xảy ra ({errors.length})</p>
              </div>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {errors.map((error, index) => (
                  <div key={error.id} className="text-xs">
                    <span className="text-red-400">Bước {error.step}:</span>
                    <span className="text-gray-300 ml-2">{error.message}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onRetry}
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <span>🔄</span>
              <span>Thử lại</span>
            </button>
            <button
              onClick={onClose}
              className="flex-1 py-3 px-6 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2"
            >
              <span>🏠</span>
              <span>Về trang chủ</span>
            </button>
          </div>
        </div>

        {/* Confetti decoration */}
        <div className="absolute top-4 right-4 text-4xl opacity-50">✨</div>
        <div className="absolute top-4 left-4 text-4xl opacity-50">✨</div>
      </motion.div>
    </div>
  );
}
