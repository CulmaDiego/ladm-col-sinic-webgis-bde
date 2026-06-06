import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">{children}</main>
      <footer className="app-footer">
        <span>LADM_COL SINIC WebGIS BDE</span>
        <span>PostgreSQL + PostGIS | EPSG:9377 | LADM_COL SINIC</span>
      </footer>
    </div>
  );
}
