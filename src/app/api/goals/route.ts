import { NextRequest, NextResponse } from "next/server";
import { collections } from "../../../lib/collections";
import { dbConnect } from "../../../lib/dbConnect";
import { ObjectId } from "mongodb";
import { getGoalsCollection } from "../../../lib/dbHelpers";

// get goals
export async function GET() {
  const goals = await getGoalsCollection();
  const allGoals = await goals.find().toArray();
  return NextResponse.json(allGoals);
}

// add goal
export async function POST(req: NextRequest) {
  const { title, description, completed = false } = await req.json();
  if (!title)
    return NextResponse.json({ error: "title is required" }, { status: 400 });
  const goals = await getGoalsCollection();
  const goal = { title, description, completed };
  const result = await goals.insertOne(goal);
  return NextResponse.json(result);
}

// update goal
export async function PUT(req: NextRequest) {
  const { id, ...editedGoal } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  const updatedFields = {
    $set: editedGoal,
  };
  const goals = await getGoalsCollection();
  await goals.updateOne({ _id: new ObjectId(id) }, updatedFields);

  const updatedGoal = await goals.findOne({
    _id: new ObjectId(id),
  });

  return NextResponse.json(updatedGoal);
  // return NextResponse.json(result);
}

// delete goal
export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  if (!id)
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  const goals = await getGoalsCollection();
  const result = await goals.deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json(result);
}
