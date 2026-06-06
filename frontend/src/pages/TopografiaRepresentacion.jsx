import TableCrud from "../components/TableCrud.jsx";
import { entityConfigs } from "../data/entityConfigs.js";

export default function TopografiaRepresentacion() {
  return <TableCrud config={entityConfigs.topografiaRepresentacion} />;
}
