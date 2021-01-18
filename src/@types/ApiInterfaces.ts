export const enum ProjectState {
  new = "new",
  offer = "offer",
  offerRejected = "offerRejected",
  planning = "planning",
  production = "production",
  installation = "installation",
  warranty = "warranty"
}

export interface ProjectInterface {
  _id: string;
  title: string;
  location: string;
  isArchived: boolean;
  description: string;
  createMoment: string;
  tagList: string[];
  totalState: ProjectState;
}

export const enum NoteRefType {
  project = "project",
  task = "task"
}

export interface NoteInterface {
  _id: string;
  refType: NoteRefType;
  refId: string;
  createUserId: string;
  createMoment: string;
  message: string;
}

export const enum TaskState {
  open = "open", // Task ist noch offen und unbearbeitet
  halted = "halted", // Task ist im Wartemodus (z.B. weil erst etwas geliefert werden muss)
  progress = "progress", // Task wird gerade bearbeitet
  completed = "completed" // Task ist vollkommen abgeschlossen
}

export const enum TaskRefType {
  project = "project",
  user = "user"
}

export interface TaskInterface {
  _id: string;
  refId: string;
  refType: TaskRefType;
  title: string;
  taskRef: number;
  description: string;
  taskState: TaskState;
  createUserId: string;
  createMoment: string;
  changeMoment: string;
  dueMoment: string;
  workUserId: string;
  seenBy?: [
    {
      userId: string;
      seeMoment: string;
    }
  ];
}
