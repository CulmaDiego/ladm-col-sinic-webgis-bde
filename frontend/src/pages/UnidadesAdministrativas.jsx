import TableCrud from "../components/TableCrud.jsx";
import { entityConfigs } from "../data/entityConfigs.js";

export default function UnidadesAdministrativas() {
  return <TableCrud config={entityConfigs.unidadesAdministrativas} />;
}
