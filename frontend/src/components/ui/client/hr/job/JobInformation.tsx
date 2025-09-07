"use client"

import { useState } from "react";

const JobInformation = () => {
    const [form, setForm] = useState({
        title: "",
        company: "",
        location: "",
        type: "",
        mode: "",
        level: "",
        salaryMin: "",
        salaryMax: "",
        salaryCurrency: "USD",
        description: "",
        requirements: "",
        benefits: "",
    });
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };
    return (
        <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold mb-6">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Chức danh *</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        placeholder="VD: Lập trình viên Frontend"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Tên công ty *</label>
                    <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        placeholder="Tên công ty của bạn"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Địa điểm *</label>
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        className="w-full bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        placeholder="Nhập địa điểm"
                    />
                </div>
                <div className="grid grid-cols-3 gap-3 col-span-full">
                    <div>
                        <label className="block text-sm font-medium mb-1">Loại công việc *</label>
                        <select
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        >
                            <option value="">Chọn loại</option>
                            <option>Toàn thời gian</option>
                            <option>Bán thời gian</option>
                            <option>Hợp đồng</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Hình thức làm việc</label>
                        <select
                            name="mode"
                            value={form.mode}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        >
                            <option value="">Chọn hình thức</option>
                            <option>Remote</option>
                            <option>Hybrid</option>
                            <option>Văn phòng</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Kinh nghiệm</label>
                        <select
                            name="level"
                            value={form.level}
                            onChange={handleChange}
                            className="w-full bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        >
                            <option value="">Chọn mức</option>
                            <option>Junior</option>
                            <option>Mid</option>
                            <option>Senior</option>
                        </select>
                    </div>
                </div>

                <div className="col-span-full">
                    <label className="block text-sm font-medium mb-1">Mức lương</label>
                    <div className="grid grid-cols-5 gap-3 items-center">
                        <input
                            name="salaryMin"
                            value={form.salaryMin}
                            onChange={handleChange}
                            className="col-span-2 bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                            placeholder="Tối thiểu"
                        />
                        <span className="flex justify-center">đến</span>
                        <input
                            name="salaryMax"
                            value={form.salaryMax}
                            onChange={handleChange}
                            className="col-span-2 bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                            placeholder="Tối đa"
                        />
                        <select
                            name="salaryCurrency"
                            value={form.salaryCurrency}
                            onChange={handleChange}
                            className="col-span-1 bg-gray-50 border border-gray-300 text-sm rounded-md px-3 py-2"
                        >
                            <option>USD</option>
                            <option>VND</option>
                        </select>
                    </div>
                    <span className="text-sm text-gray-500 mt-1 inline-block">/ mỗi tháng</span>
                </div>
            </div>
        </section>

    )
}