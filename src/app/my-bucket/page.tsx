"use client";
import { useCallback, useEffect, useState } from "react";
import GoalsCard from "../../components/GoalsCard";
import { Goal } from "../../lib/types";

const MyBucket = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(false);
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
  // ADD
  const addGoal = (goal: Goal) => {
    setGoals((prev) => [goal, ...prev]);
  };

  // UPDATE
  const updateGoal = (updatedGoal: Goal) => {
    setGoals((prev) =>
      prev.map((g) => (g._id === updatedGoal._id ? updatedGoal : g)),
    );
  };

  // DELETE
  const deleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g._id !== id));
  };
  return (
    <>
      {/* name of each tab group should be unique */}
      {loading && <p>Loading...</p>}
      <div className="tabs tabs-box">
        <input
          type="radio"
          name="bucket_tabs"
          className="tab"
          aria-label="My Buckets"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6">
          {goals.map((goal) => (
            <GoalsCard key={goal._id} goal={goal} onUpdate={updateGoal}
          onDelete={deleteGoal} />
          ))}
        </div>

        <input
          type="radio"
          name="bucket_tabs"
          className="tab"
          aria-label="Complete"
          defaultChecked
        />
        <div className="tab-content bg-base-100 border-base-300 p-6"></div>

        <input
          type="radio"
          name="bucket_tabs"
          className="tab"
          aria-label="In Complete"
        />
        <div className="tab-content bg-base-100 border-base-300 p-6"></div>
      </div>
    </>
  );
};

export default MyBucket;
