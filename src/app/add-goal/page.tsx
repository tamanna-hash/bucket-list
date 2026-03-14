"use client";

import { useState } from "react";

export default function AddBucket() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (res.ok) {
        setTitle("");
        setDescription("");
        alert("Bucket added!");
      } else {
        alert("Failed to add bucket.");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding bucket.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-4 bg-base-200 rounded-lg shadow"
    >
      <h2 className="text-xl mb-4">Add New Bucket</h2>

      <input
        type="text"
        placeholder="Title"
        className="input w-full mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      <textarea
        placeholder="Description"
        className="textarea textarea-bordered w-full mb-3"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />

      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Bucket"}
      </button>
    </form>
  );
}
