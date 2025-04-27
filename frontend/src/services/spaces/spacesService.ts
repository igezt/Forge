export async function fetchSpaces(): Promise<Space[]> {
  //   const response = await fetch("/api/spaces");
  //   if (!response.ok) {
  //     throw new Error("Failed to fetch spaces");
  //   }
  //   return response.json();
  return [
    {
      id: "123",
      name: "Pie's space",
      createdAt: "27/04/2025",
      updatedAt: "27/04/2025",
      createdBy: "Pie",
      numberOfPages: 0,
      accessLevel: "private",
      description: "Pie's space for testing",
    },
  ];
}
