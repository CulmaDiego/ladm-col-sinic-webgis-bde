import TableCrud from "../components/TableCrud.jsx";
import { entityConfigs } from "../data/entityConfigs.js";

export default function CartografiaCatastral() {
  return <TableCrud config={entityConfigs.cartografiaCatastral} />;
}
