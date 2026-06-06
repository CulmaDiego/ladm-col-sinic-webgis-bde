import TableCrud from "../components/TableCrud.jsx";
import { entityConfigs } from "../data/entityConfigs.js";

export default function UnidadesEspaciales() {
  return <TableCrud config={entityConfigs.unidadesEspaciales} />;
}
