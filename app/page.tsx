'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-cyan-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-primary-700">
            🧪 Virtual Lab - BOD & COD
          </h1>
          <p className="text-gray-600 mt-2">
            Môi trường thực hành ảo đo BOD và COD trong mẫu nước
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* COD Module Card */}
          <Link href="/lab/cod">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer border-4 border-transparent hover:border-orange-400 transition-all"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🔥</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Đo COD
                </h2>
                <p className="text-gray-600 mb-6">
                  Phương pháp Dichromate phản khử - Đo Chemical Oxygen Demand trong mẫu nước
                </p>
                <div className="bg-orange-50 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-orange-800 mb-2">Tổng quan:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 8 bước thực hiện</li>
                    <li>• Thời gian: 15-20 phút</li>
                    <li>• Sử dụng K₂Cr₂O₇ và H₂SO₄</li>
                    <li>• Đun nóng 150°C trong 2 giờ</li>
                  </ul>
                </div>
                <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Bắt đầu thực hành →
                </button>
              </div>
            </motion.div>
          </Link>

          {/* BOD Module Card */}
          <Link href="/lab/bod">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl shadow-xl p-8 cursor-pointer border-4 border-transparent hover:border-green-400 transition-all"
            >
              <div className="text-center">
                <div className="text-6xl mb-4">🌱</div>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Đo BOD₅
                </h2>
                <p className="text-gray-600 mb-6">
                  Phương pháp pha loãng - Đo Biochemical Oxygen Demand trong 5 ngày
                </p>
                <div className="bg-green-50 rounded-lg p-4 text-left">
                  <h3 className="font-semibold text-green-800 mb-2">Tổng quan:</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• 7 bước thực hiện</li>
                    <li>• Thời gian: 10-15 phút</li>
                    <li>• Sử dụng vi sinh vật</li>
                    <li>• Ủ 20°C trong 5 ngày</li>
                  </ul>
                </div>
                <button className="mt-6 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                  Bắt đầu thực hành →
                </button>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">ℹ️ Hướng dẫn sử dụng</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-primary-600 mb-2">🎯 Chế độ Guided</h4>
              <p className="text-gray-600 text-sm">
                Hướng dẫn chi tiết từng bước, chặn nếu sai, gợi ý khi gặp khó khăn
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-600 mb-2">🎮 Chế độ Practice</h4>
              <p className="text-gray-600 text-sm">
                Tự do thực hành, ghi nhận lỗi để review, không có hướng dẫn chi tiết
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-primary-600 mb-2">📊 Điểm số</h4>
              <p className="text-gray-600 text-sm">
                Đánh giá dựa trên Accuracy (40%), Safety (30%), Efficiency (30%)
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm mt-12 py-6 text-center text-gray-600">
        <p>© 2026 Virtual Lab - BOD & COD Measurement | Built with Next.js & Three.js</p>
      </footer>
    </div>
  );
}
