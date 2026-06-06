import { Route, Routes } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import AprendeSINIC from "./pages/AprendeSINIC.jsx";
import AprendeUML from "./pages/AprendeUML.jsx";
import CartografiaCatastral from "./pages/CartografiaCatastral.jsx";
import DerechosInteresados from "./pages/DerechosInteresados.jsx";
import Home from "./pages/Home.jsx";
import Interesados from "./pages/Interesados.jsx";
import ModeloDatosSINIC from "./pages/ModeloDatosSINIC.jsx";
import TopografiaRepresentacion from "./pages/TopografiaRepresentacion.jsx";
import UnidadesAdministrativas from "./pages/UnidadesAdministrativas.jsx";
import UnidadesEspaciales from "./pages/UnidadesEspaciales.jsx";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aprende-sinic" element={<AprendeSINIC />} />
        <Route path="/aprende-uml" element={<AprendeUML />} />
        <Route path="/modelo-datos-sinic" element={<ModeloDatosSINIC />} />
        <Route path="/modelo" element={<ModeloDatosSINIC />} />
        <Route path="/interesados" element={<Interesados />} />
        <Route
          path="/unidades-administrativas"
          element={<UnidadesAdministrativas />}
        />
        <Route path="/derechos-interesados" element={<DerechosInteresados />} />
        <Route path="/derechos" element={<DerechosInteresados />} />
        <Route path="/unidades-espaciales" element={<UnidadesEspaciales />} />
        <Route
          path="/topografia-representacion"
          element={<TopografiaRepresentacion />}
        />
        <Route path="/topografia" element={<TopografiaRepresentacion />} />
        <Route path="/cartografia-catastral" element={<CartografiaCatastral />} />
        <Route path="/cartografia" element={<CartografiaCatastral />} />
      </Routes>
    </Layout>
  );
}
