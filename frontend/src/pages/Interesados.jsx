import TableCrud from "../components/TableCrud.jsx";
import { entityConfigs } from "../data/entityConfigs.js";

export default function Interesados() {
  return <TableCrud config={entityConfigs.interesados} />;
}
