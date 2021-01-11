declare module "ApiInterfaces" {
  const enum ProjectState {
    new = "new",
    offer = "offer",
    planning = "planning",
    production = "production",
    installation = "installation",
    warranty = "warranty",
    archived = "archived"
  }

  const enum NoteRefType {
    project = "project",
    task = "task"
  }

  const enum TaskState {
    open = "open", // Task ist noch offen und unbearbeitet
    completed = "completed", // Task ist vollkommen abgeschlossen
    blocked = "blocked", // Task ist momentan blockiert (z.B. Lieferung erwatet etc)
    archived = "archived", // Task wurde archiviert (zu Dokuzwecken, damit nicht alles gelöscht werden muss)
    progress = "progress", // Task wird gerade bearbeitet
    denied = "denied" // Task wurde vom Bearbeiter abgelehnt -> Kommentar prüfe
  }

  interface ProjectInterface {
    _id: string;
    title: string;
    location: string;
    description: string;
    createMoment: Date;
    tagList: string[];
    totalState: ProjectState;
  }

  interface NoteInterface {
    _id: string;
    refType: NoteRefType;
    refId: string;
    createUserId: string;
    message: string;
  }

  interface TaskInterface {
    _id: string;
    title: string;
    description: string;
    taskState: TaskState;
    projectId: string; // Kann leer sein, wenn Aufgabe keinem Projekt zugeordnet ist (für private Aufgaben z.B.)
    createUserId: string; // Ersteller der Aufgabe - const
    workUserId: string; // Bearbeiter der Aufgabe - kann wechseln
  }
}
