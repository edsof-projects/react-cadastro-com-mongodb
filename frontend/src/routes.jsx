import { Routes, Route } from "react-router-dom"
import Logaruser from "./pages/Logaruser"
import Cadastrauser from "./pages/Cadastrauser"
import Home from "./pages/Home"

const MainRoutes = () => {
    return(
        <Routes>
            {/* pagina inicial do login */}
            <Route path="/" element={<Logaruser />} /> 
            {/* pagina de cadastro de usuarios */}
            <Route path="/register" element={<Cadastrauser />} />
            {/* pagina de listagem de usuários - Home */}
            <Route path="/users" element={<Home />} />
        </Routes>
    )
}

export default MainRoutes
