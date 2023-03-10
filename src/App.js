import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"
import { NavContainer } from "./style/styles"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"

export default function App() {

    const [Assentos, setAssentos] = useState(null);
    const [CPF, SetCPF] = useState("");
    const [nome, Setnome] = useState("");
    const [arrSeats, setArrSeats] = useState([]);

    function limpar() {
        setAssentos(null)
        SetCPF("")
        Setnome("")
        setArrSeats([])
    }

    return (
        <BrowserRouter>
            <NavContainer>CINEFLEX</NavContainer>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage Assentos={Assentos} setAssentos={setAssentos}
                    CPF={CPF} SetCPF={SetCPF} nome={nome} Setnome={Setnome} arrSeats={arrSeats} setArrSeats={setArrSeats} />} />
                <Route path="/sucesso" element={<SuccessPage Assentos={Assentos} CPF={CPF} nome={nome} arrSeats={arrSeats} limpar={limpar}/>} />
            </Routes>
        </BrowserRouter>
    )
}