import React from "react";

interface ApplyModalProps {
  jobTitle: string;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ApplyModal({
  jobTitle,
  onClose,
  onConfirm,
}: ApplyModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="font-semibold text-gray-900 mb-4">
          Ứng tuyển: {jobTitle}
        </h3>
        <p className="text-gray-600 mb-6">
          Bạn có chắc chắn muốn ứng tuyển cho vị trí này không? Hệ thống sẽ
          chuyển bạn đến trang tạo CV.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-[#f26b38] hover:bg-[#e55a2b] text-white rounded-lg transition-colors"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
