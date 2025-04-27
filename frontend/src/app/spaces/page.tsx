import { AddSpacesDialog } from "@/components/spaces/add-spaces-dialog";
import { SpacesTable } from "@/components/spaces/spaces-table";

export default function Cards() {
  return (
    <div>
      <AddSpacesDialog />
      <SpacesTable />
    </div>
  );
}
