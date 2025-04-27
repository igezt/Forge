"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSpaces } from "@/hooks/use-spaces";
import { Spinner } from "../ui/spinner";

export function SpacesTable() {
  const { spaces, isLoading, error, refetch } = useSpaces();

  const tableHeaders = [
    // { label: "ID", key: "id" },
    { label: "Name", key: "name" },
    { label: "Description", key: "description" },
    { label: "Created At", key: "createdAt" },
    { label: "Last Updated At", key: "updatedAt" },
    { label: "Created By", key: "createdBy" },
    { label: "Number of pages", key: "numberOfPages" },
    { label: "Access Level", key: "accessLevel" },
  ];

  return (
    <div>
      {isLoading ? (
        <div className="">
          <Spinner />
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeaders.map((header, ind) => (
                <TableHead key={header.key}>{header.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {spaces?.map((space) => (
              <TableRow key={space.id}>
                {tableHeaders.map((header) => (
                  <TableCell key={header.key}>
                    {space[header.key as keyof Space]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
