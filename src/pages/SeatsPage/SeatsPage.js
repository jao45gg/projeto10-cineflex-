import styled from "styled-components"
import { useParams, Link } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function SeatsPage() {

    const { idSessao } = useParams()

    const [Assentos, setAssentos] = useState(null);
    const [arrSeats, setArrSeats] = useState([]);

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`)

        promisse.then((resposta) => setAssentos(resposta.data))
        promisse.catch((erro) => console.log(erro))
    }, [idSessao])

    if (Assentos === null) {
        return (
            <div>Carregando</div>
        )
    }

    function colorSeat(status, id) {

        if (arrSeats.includes(id))
            return "#1AAE9E"

        if (status)
            return "#C3CFD9"

        return "#FBE192"
    }

    function borderColorSeat(status, id) {

        if (arrSeats.includes(id))
            return "#0E7D71"

        if (status)
            return "#7B8B99"

        return "#F7C52B"
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {Assentos.seats.map(a =>
                    <SeatItem color={colorSeat(a.isAvailable, a.id)} borderColor={borderColorSeat(a.isAvailable, a.id)}
                        onClick={() => {
                            if (arrSeats.includes(a.id)) {

                                let newArr = [];
                                for (let index = 0; index < arrSeats.length; index++) {

                                    if (arrSeats[index] !== a.id)
                                        newArr.push(arrSeats[index])

                                }

                                setArrSeats(newArr);

                            } else if (a.isAvailable) {
                                setArrSeats([...arrSeats, a.id])
                            } else
                                alert("Esse assento não está disponível");
                        }}>{a.name}</SeatItem>
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
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={Assentos.movie.posterURL} alt={Assentos.movie.title} />
                </div>
                <div>
                    <p>{Assentos.movie.title}</p>
                    <p>{`${Assentos.day.weekday} - ${Assentos.name}`}</p>
                </div>
            </FooterContainer>

        </PageContainer >
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
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
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
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
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`