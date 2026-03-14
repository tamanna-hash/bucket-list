import React, { useState } from "react";
import { EditedGoal, Goal, GoalsCardProps } from "../lib/types";
import Swal from "sweetalert2";

const GoalsCard = ({ goal, onUpdate, onDelete }: GoalsCardProps) => {
  const { title, description } = goal;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedGoal, setEditedGoal] = useState<EditedGoal>({
    title,
    description,
  });
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async () => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/goals`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...editedGoal, id: goal._id }),
      });

      if (!response.ok) throw new Error("Failed to update");
      const updatedGoal: Goal = await response.json();

      onUpdate(updatedGoal);
      setIsModalOpen(false);
      Swal.fire({
        title: "Goal Updated",
        icon: "success",
        draggable: true,
      });
    } catch (error) {
      console.error("Update failed:", error);
      alert("Could not save changes. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };
  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch("/api/goals", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: goal._id }),
          });

          if (!res.ok) throw new Error("Failed to delete");
          Swal.fire({
            title: "Deleted!",
            text: "Your goal has been deleted.",
            icon: "success",
          });
          onDelete(goal._id); // update UI instantly
        } catch (error) {
          console.error("Delete failed:", error);
          alert("Could not delete goal.");
        }
      }
    });
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
          <button
            onClick={handleDelete}
            className="btn bg-red-500 text-white px-4 py-2 rounded"
          >
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
                onClick={handleUpdate}
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
