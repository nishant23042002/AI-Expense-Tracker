import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance.js";
import { toast } from "react-toastify";
import { API_PATHS } from "../../utils/apiPath.js";

export default function GoalList() {
    const [goals, setGoals] = useState([]);

    const fetchGoals = async () => {
        try {
            const res = await axiosInstance.get(`${API_PATHS.GOAL.GOAL_PROGRESS}`);
            setGoals(res.data.progress || []);
        } catch (err) {
            toast.error(err.message || "Failed to fetch goals");
        }
    };

    const handleRefreshTip = async (goalId) => {
        try {
            await axiosInstance.put(`${API_PATHS.GOAL.REFRESH_GOAL_TIP}/${goalId}`);
            toast.success("Tip refreshed!");
            fetchGoals();
        } catch (err) {
            toast.error(err.message || "Failed to refresh tip");
        }
    };

    useEffect(() => {
        fetchGoals();
    }, []);

    return (
        <div className="space-y-6">
            {goals.length === 0 ? (
                <p className="text-gray-400 text-center">No goals yet.</p>
            ) : (
                goals.map(({ goal, percentCompleted, monthlyTarget, monthsLeft, isOnTrack, aiTipForSaving }) => (
                    <div key={goal._id} className="bg-white p-4 rounded shadow space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-slate-700">{goal.title}</h3>
                            <span className={`text-sm ${isOnTrack ? "text-green-600" : "text-red-500"}`}>
                                {isOnTrack ? "✅ On Track" : "⚠️ Behind"}
                            </span>
                        </div>

                        <div className="text-gray-600 text-sm">
                            Target: ₹{goal.amount} | Duration: {goal.durationMonths} months
                        </div>

                        <div className="w-full bg-gray-200 rounded h-2 my-1">
                            <div
                                className="bg-blue-600 h-2 rounded"
                                style={{ width: `${percentCompleted}%` }}
                            ></div>
                        </div>
                        <div className="text-sm text-gray-500">{percentCompleted}% completed</div>

                        <div className="bg-yellow-50 text-yellow-800 p-2 rounded text-sm">{aiTipForSaving}</div>

                        <button
                            onClick={() => handleRefreshTip(goal._id)}
                            className="text-blue-500 text-sm underline mt-1"
                        >
                            Refresh Tip
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
