export type Goal = {
  _id: string;
  title: string;
  description: string;
  complete: Boolean;
};
export interface EditedGoal {
  title: string;
  description: string;
}
export interface GoalsCardProps {
  goal: Goal;
  onUpdate: (goal: Goal) => void;
  onDelete: (id: string) => void;
}