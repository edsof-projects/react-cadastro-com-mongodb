import { Routes, Route } from "react-router-dom"
import Logaruser from "./pages/Logaruser"
import Cadastrauser from "./pages/Cadastrauser"
import Home from "./pages/Home"
import Notfound from "./pages/Notfound"
import Editauser from "./pages/Editauser"
import Editasenha from "./pages/Editasenha"

const MainRoutes = () => {
    return(
        <Routes>
            {/* pagina inicial do login */}
            <Route exact path="/" element={<Logaruser />} /> 

            {/* pagina de cadastro de usuarios */}
            <Route exact path="/register" element={<Cadastrauser />} />

            {/* pagina de edição de usuarios */}
            <Route exact path="/editar/:id" element={<Editauser />} />

            {/* pagina de edição de senha */}
            <Route exact path="/editarsenha" element={<Editasenha />} />

            {/* pagina de listagem de usuários - Home */}
            <Route exact path="/home" element={<Home />} />
            
            {/* pagina não encontrada */}
            <Route exact path="/notfound" element={<Notfound />} />
        </Routes>
    )
}

export default MainRoutes
