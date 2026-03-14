import React, { useState } from "react";
import { Goal } from "../lib/types";

interface GoalsCardProps {
  goal: Goal;
  //   onSave: (updatedGoal: Goal) => void; // Pass a function to handle the save logic
}

const GoalsCard = ({ goal }: GoalsCardProps) => {
  const { title, description } = goal;

  // 1. State for Modal Visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. State for Form Inputs (Pre-filled with goal data)
  const [editedGoal, setEditedGoal] = useState({ title, description });
  // State to handle the "Saving..." UI feedback
  const [isUpdating, setIsUpdating] = useState(false);
  const handleSave = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/goals/${goal._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedGoal),
      });

      if (!response.ok) throw new Error("Failed to update");
      setIsModalOpen(false);

    } catch (error) {
      console.error("Update failed:", error);
      alert("Could not save changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="p-4 m-4 rounded-2xl border border-gray-200">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
        <div className="flex justify-between items-center gap-2">
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
          <button className="btn bg-red-500 text-white px-4 py-2 rounded">
            Delete
          </button>
        </div>
      </div>

      {/* MODAL OVERLAY */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">
            <h2 className="text-xl font-bold mb-4">Edit Goal</h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                className="border p-2 rounded w-full"
                value={editedGoal.title}
                onChange={(e) =>
                  setEditedGoal({ ...editedGoal, title: e.target.value })
                }
                placeholder="Title"
              />
              <textarea
                className="border p-2 rounded w-full"
                value={editedGoal.description}
                onChange={(e) =>
                  setEditedGoal({ ...editedGoal, description: e.target.value })
                }
                placeholder="Description"
              />
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Back
              </button>
              <button
                onClick={handleSave}
                disabled={isUpdating}
                className={`px-4 py-2 text-white rounded ${isUpdating ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}
              >
                {isUpdating ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsCard;
