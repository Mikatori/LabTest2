'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ErrorModalProps {
  message: string;
  type: 'safety' | 'procedure' | 'measurement' | 'warning';
  onClose: () => void;
}

export default function ErrorModal({ message, type, onClose }: ErrorModalProps) {
  useEffect(() => {
    // Auto-close after 5 seconds
    const timer = setTimeout(() => {
      onClose();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getErrorConfig = () => {
    switch (type) {
      case 'safety':
        return {
          icon: '⚡',
          bgColor: 'bg-red-900/95',
          borderColor: 'border-red-500',
          iconBg: 'bg-red-500',
          title: 'CẢNH BÁO AN TOÀN',
          textColor: 'text-red-200',
        };
      case 'procedure':
        return {
          icon: '🚫',
          bgColor: 'bg-orange-900/95',
          borderColor: 'border-orange-500',
          iconBg: 'bg-orange-500',
          title: 'LỖI THỦ TỤC',
          textColor: 'text-orange-200',
        };
      case 'measurement':
        return {
          icon: '📏',
          bgColor: 'bg-yellow-900/95',
          borderColor: 'border-yellow-500',
          iconBg: 'bg-yellow-500',
          title: 'LỖI ĐO LƯỜNG',
          textColor: 'text-yellow-200',
        };
      case 'warning':
      default:
        return {
          icon: 'ℹ️',
          bgColor: 'bg-blue-900/95',
          borderColor: 'border-blue-500',
          iconBg: 'bg-blue-500',
          title: 'THÔNG BÁO',
          textColor: 'text-blue-200',
        };
    }
  };

  const config = getErrorConfig();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className={`${config.bgColor} ${config.borderColor} border-2 rounded-xl shadow-2xl max-w-md w-full relative overflow-hidden`}
      >
        {/* Decorative top bar */}
        <div className={`h-1 ${config.iconBg} w-full`} />

        <div className="p-6">
          {/* Icon and Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className={`${config.iconBg} w-12 h-12 rounded-full flex items-center justify-center text-2xl`}>
              {config.icon}
            </div>
            <h2 className={`text-xl font-bold ${config.textColor}`}>{config.title}</h2>
          </div>

          {/* Message */}
          <div className="bg-black/20 rounded-lg p-4 mb-4">
            <p className="text-white text-base leading-relaxed">{message}</p>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className={`w-full py-3 px-6 ${config.iconBg} hover:opacity-90 text-white rounded-lg transition-all font-semibold flex items-center justify-center gap-2`}
          >
            <span>Đã hiểu</span>
            <span>✓</span>
          </button>
        </div>

        {/* Progress bar for auto-close */}
        <motion.div
          initial={{ width: '100%' }}
          animate={{ width: '0%' }}
          transition={{ duration: 5, ease: 'linear' }}
          className={`h-1 ${config.iconBg} absolute bottom-0 left-0`}
        />
      </motion.div>
    </div>
  );
}
