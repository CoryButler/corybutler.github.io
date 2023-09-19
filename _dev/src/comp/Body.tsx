import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import About from "../pages/about";
import Art_2D from "../pages/art_2d";
import Art_3D from "../pages/art_3d";
import Contact from "../pages/contact";
import Dev from "../pages/dev";

export default function Body(props: any) {
    return (
        <section className="body">
            <Routes>
                <Route path="/" element={<About />} />
                <Route path="/about" element={<About />} />
                <Route path="/2d" element={<Art_2D />} />
                <Route path="/3d" element={<Art_3D />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/dev" element={<Dev />} />
            </Routes>
        </section>
    );
}