import {
  BookOpen,
  Database,
  GraduationCap,
  Home,
  Landmark,
  Layers,
  Map,
  Network,
  Route,
  Users,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Inicio", icon: Home, end: true },
  { to: "/aprende-sinic", label: "Aprende SINIC", icon: BookOpen },
  { to: "/aprende-uml", label: "Aprende UML", icon: GraduationCap },
  { to: "/modelo-datos-sinic", label: "Modelo", icon: Network },
  { to: "/interesados", label: "Interesados", icon: Users },
  { to: "/unidades-administrativas", label: "Unidades adm.", icon: Landmark },
  { to: "/derechos-interesados", label: "Derechos", icon: Route },
  { to: "/unidades-espaciales", label: "Unidades esp.", icon: Map },
  { to: "/topografia-representacion", label: "Topografia", icon: Layers },
  { to: "/cartografia-catastral", label: "Cartografia", icon: Database },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <NavLink to="/" className="brand" title="Inicio">
        <Database size={24} aria-hidden="true" />
        <span>LADM_COL SINIC</span>
      </NavLink>

      <nav className="nav-scroll" aria-label="Navegacion principal">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              title={item.label}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </header>
  );
}
