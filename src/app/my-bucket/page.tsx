"use client";
import { useEffect, useState } from "react";
import GoalsCard from "../../components/GoalsCard";
import { Goal } from "../../lib/types";

const MyBucket = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "all" | "completed" | "incomplete"
  >("all");
console.log(goals)
  // Fetch goals once on mount
  useEffect(() => {
    const fetchGoals = async () => {
      setLoading(true);
      const res = await fetch("/api/goals");
      const data: Goal[] = await res.json();
      setGoals(data);
      setLoading(false);
    };
    fetchGoals();
  }, []);

  // Add goal
  const addGoal = (goal: Goal) => {
    setGoals((prev) => [goal, ...prev]);
  };

  // Update goal
  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prev) =>
      prev.map((g) => (g._id === updatedGoal._id ? updatedGoal : g)),
    );
  };

  // Delete goal
  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g._id !== id));
  };

  // Filter goals dynamically based on activeTab
  const filteredGoals = goals.filter((goal) => {
    const completed = goal.completed ?? false;

    if (activeTab === "completed") return completed;
    if (activeTab === "incomplete") return !completed;
    return true;
  });

  return (
    <>
      {loading && <p>Loading...</p>}

      {/* Tabs */}
      <div className="tabs tabs-box mb-4">
        <button
          className={`tab ${activeTab === "all" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("all")}
        >
          All
        </button>
        <button
          className={`tab ${activeTab === "completed" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("completed")}
        >
          Completed
        </button>
        <button
          className={`tab ${activeTab === "incomplete" ? "tab-active" : ""}`}
          onClick={() => setActiveTab("incomplete")}
        >
          Incomplete
        </button>
      </div>

      {/* Dynamic Tab Content */}

      <div className=" border-base-300 p-6">
        {filteredGoals.length === 0 ? (
          <p className="text-gray-500">No goals in this section.</p>
        ) : (
          filteredGoals.map((goal) => (
            <GoalsCard
              key={goal._id}
              goal={goal}
              onUpdate={updateGoal}
              onDelete={deleteGoal}
            />
          ))
        )}
      </div>
    </>
  );
};

export default MyBucket;
