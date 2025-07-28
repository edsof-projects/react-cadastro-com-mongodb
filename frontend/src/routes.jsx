import { Routes, Route } from "react-router-dom"
import Logaruser from "./pages/Logaruser"
import Cadastrauser from "./pages/Cadastrauser"
import Home from "./pages/Home"
import Notfound from "./pages/Notfound"

const MainRoutes = () => {
    return(
        <Routes>
            {/* pagina inicial do login */}
            <Route exact path="/" element={<Logaruser />} /> 
            {/* pagina de cadastro de usuarios */}
            <Route exact path="/register" element={<Cadastrauser />} />
            {/* pagina de listagem de usuários - Home */}
            <Route exact path="/users" element={<Home />} />
            {/* pagina não encontrada */}
            <Route exact path="/notfound" element={<Notfound />} />
        </Routes>
    )
}

export default MainRoutes
