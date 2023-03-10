import styled from "styled-components"
import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react";
import axios from "axios";
import { PageContainer2, SeatsContainer, FormContainer, CaptionContainer, CaptionItem, FooterContainer1 } from "../../style/styles";

export default function SeatsPage({ Assentos, setAssentos, CPF, SetCPF, nome, Setnome, arrSeats, setArrSeats }) {

    const { idSessao } = useParams()
    const navigate = useNavigate();

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)

        promisse.then((resposta) => setAssentos(resposta.data))
        promisse.catch((erro) => console.log(erro))
    }, [idSessao, setAssentos])

    if (Assentos === null) {
        return (
            <div>Carregando</div>
        )
    }

    function colorSeat(status, a) {
        if (arrSeats.includes(a))
            return "#1AAE9E"

        if (status)
            return "#C3CFD9"

        return "#FBE192"
    }

    function borderColorSeat(status, a) {
        if (arrSeats.includes(a))
            return "#0E7D71"

        if (status)
            return "#7B8B99"

        return "#F7C52B"
    }

    function reservarAssentos(e) {
        e.preventDefault();

        let newArr = [];
        for (let index = 0; index < arrSeats.length; index++) {
            newArr.push(arrSeats[index].id)
        }
        

        const promisse = axios.post("https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many", {
            ids: newArr,
            name: nome,
            cpf: CPF
        });

        promisse.then(() => navigate("/sucesso"))
        promisse.catch((e) => console.log(e))
    }

    return (
        <PageContainer2>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {Assentos.seats.map((a, index) =>
                    <SeatItem key={index} color={colorSeat(a.isAvailable, a)} borderColor={borderColorSeat(a.isAvailable, a)}
                        onClick={() => {
                            if (arrSeats.includes(a)) {
                                let newArr = [];
                                for (let index = 0; index < arrSeats.length; index++) {
                                    if (arrSeats[index] !== a)
                                        newArr.push(arrSeats[index])
                                }
                                setArrSeats(newArr);
                            } else if (a.isAvailable) {
                                setArrSeats([...arrSeats, a])
                            } else
                                alert("Esse assento não está disponível");
                        }} data-test="seat">{a.name}</SeatItem>
                )}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle color="#1AAE9E" borderColor="#0E7D71" />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#C3CFD9" borderColor="#7B8B99" />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle color="#FBE192" borderColor="#F7C52B" />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={reservarAssentos}>
                    Nome do Comprador:
                    <input data-test="client-name" type="text" value={nome} required placeholder="Digite seu nome..." onChange={e => Setnome(e.target.value)} />

                    CPF do Comprador:
                    <input data-test="client-cpf" type="text" value={CPF} required placeholder="Digite seu CPF..." onChange={e => SetCPF(e.target.value)} />

                    <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
                </form>
            </FormContainer>

            <FooterContainer1 data-test="footer">
                <div>
                    <img src={Assentos.movie.posterURL} alt={Assentos.movie.title} />
                </div>
                <div>
                    <p>{Assentos.movie.title}</p>
                    <p>{`${Assentos.day.weekday} - ${Assentos.name}`}</p>
                </div>
            </FooterContainer1>

        </PageContainer2 >
    )
}

const CaptionCircle = styled.div`
    border: 1px solid ${props => props.borderColor};         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`

const SeatItem = styled.div`
    border: 1px solid ${props => props.borderColor};         // Essa cor deve mudar
    background-color: ${props => props.color};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`