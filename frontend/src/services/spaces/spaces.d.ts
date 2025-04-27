interface Space {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  numberOfPages: number;
  accessLevel: "private" | "team" | "public";
  lastActivityAt?: string;
}

enum SpaceAccessLevel {
  PRIVATE,
  TEAM,
  PUBLIC,
}
