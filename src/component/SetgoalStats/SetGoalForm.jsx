import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { API_PATHS } from "../../utils/apiPath";

export default function SetGoalForm({ onGoalCreated }) {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [durationMonths, setDurationMonths] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post(`${API_PATHS.GOAL.SET_GOAL}`, {
                title,
                amount: Number(amount),
                durationMonths: Number(durationMonths),
            });
            toast.success("Goal created!");
            onGoalCreated(); // refresh list
            setTitle("");
            setAmount("");
            setDurationMonths("");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to set goal");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">Set a New Goal</h2>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Goal Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Target Amount (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="number"
                    placeholder="Duration (in months)"
                    value={durationMonths}
                    onChange={(e) => setDurationMonths(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                    Save Goal
                </button>
            </div>
        </form>
    );
}
