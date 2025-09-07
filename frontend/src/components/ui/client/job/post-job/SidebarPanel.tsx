"use client";
import React from "react";
import { Job } from "@/types/job.type"; 

interface Props {
  form: Job;
  onSaveDraft: () => void;
  onPublish: () => void;
}

export default function RightSidebarPanel({ form, onSaveDraft, onPublish }: Props) {
  return (
    <aside className="space-y-6">
      {/* Chi phí */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="text-base font-semibold text-gray-800 mb-4">Chi phí</h3>

        <div className="flex justify-between text-sm text-gray-700 mb-3">
          <span>Đăng tin cơ bản</span>
          <span>Miễn phí</span>
        </div>

        <hr className="border-gray-200 mb-3" />

        <div className="flex justify-between font-semibold text-sm text-gray-900">
          <span>Tổng cộng</span>
          <span>0đ</span>
        </div>
      </div>

      {/* Xem trước */}
      <div className="bg-white p-6 rounded-lg shadow space-y-3">
        <h3 className="text-lg font-semibold">Xem trước</h3>
        <div>
          <strong>Chức danh:</strong> {form.title || "Chức danh công việc"}
        </div>
        <div>
          <strong>Công ty:</strong> {form.company || "Tên công ty"}
        </div>
        <div>
          <strong>Địa điểm:</strong> {form.location || "Địa điểm"}
        </div>
        <div>
          <strong>Loại:</strong> {form.type || "Loại công việc"}
        </div>
      </div>

      {/* Nút hành động */}
      <div className="space-y-3">
        <button
          onClick={onSaveDraft}
          className="w-full py-2 border rounded hover:bg-gray-100"
        >
          Lưu bản nháp
        </button>
        <button
          onClick={onPublish}
          className="w-full py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
        >
          Đăng tuyển
        </button>
      </div>
    </aside>
  );
}
