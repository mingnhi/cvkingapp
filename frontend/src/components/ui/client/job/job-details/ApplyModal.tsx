import { UploadCloud } from "lucide-react";
import React, { memo, useState } from "react";

interface ApplyModalProps {
  jobTitle: string;
  onClose: () => void;
  onConfirm: (formData: {coverLetter?: File | null}) => void;
}

/**
 * Component hiển thị modal xác nhận ứng tuyển công việc.
 */
const ApplyModal = memo(function ApplyModal({ jobTitle, onClose, onConfirm }: ApplyModalProps) {

  const [coverLetter, setCoverLetter] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 5 * 1024 * 1024) {
      alert("File vượt quá kích thước cho phép(tối đa 5MB).");
      return;
    }
    setCoverLetter(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coverLetter) {
      alert("Vui lòng chọn cv trước khi nộp!");
    }
    onConfirm({ coverLetter });
  }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg">
        {/* Header */}
        <div className="border-b px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Ứng tuyển: <span className="text-orange-600">{jobTitle}</span>
          </h2>
        </div>

        {/* Upload Cover Letter */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="border border-dashed border-orange-400 rounded-lg p-5 text-center">
            <div className="flex flex-col items-center">
              <UploadCloud className="h-10 w-10 text-gray-400 mb-2" />
              <p className="font-medium text-gray-800">
                Tải lên Thư giới thiệu từ máy tính, chọn hoặc kéo thả
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Hỗ trợ định dạng .doc, .docx, .pdf có kích thước dưới 5MB
              </p>

              <label
                htmlFor="cover-upload"
                className="inline-block bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-800 text-sm font-medium px-4 py-2 rounded-md cursor-pointer transition"
              >
                Chọn Thư giới thiệu
              </label>
              <input
                id="cover-upload"
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                onChange={handleFileChange}
              />

              {coverLetter && (
                <p className="mt-3 text-sm text-orange-700 font-medium">
                  ✅ {coverLetter.name}
                </p>
              )}
            </div>
          </div>

          {/* Footer buttons */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 rounded-md transition"
            >
              Nộp hồ sơ ứng tuyển
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default ApplyModal;
