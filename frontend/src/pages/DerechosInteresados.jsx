import TableCrud from "../components/TableCrud.jsx";
import { entityConfigs } from "../data/entityConfigs.js";

export default function DerechosInteresados() {
  return <TableCrud config={entityConfigs.derechosInteresados} />;
}
