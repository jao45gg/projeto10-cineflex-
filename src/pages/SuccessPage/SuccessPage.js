import { Link } from "react-router-dom"
import { PageContainer3, TextContainer } from "../../style/styles.js"

export default function SuccessPage({ Assentos, CPF, nome, arrSeats, limpar }) {

    return (
        <PageContainer3>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer data-test="movie-info">
                <strong><p>Filme e sessão</p></strong>
                <p>{Assentos.movie.title}</p>
                <p>{`${Assentos.day.date} ${Assentos.name}`}</p>
            </TextContainer>

            <TextContainer data-test="seats-info">
                <strong><p>Ingressos</p></strong>
                {arrSeats.map((a, index) => <p key={index}>Assento {a.name}</p>)}
            </TextContainer>

            <TextContainer data-test="client-info">
                <strong><p>Comprador</p></strong>
                <p>Nome: {nome}</p>
                <p>CPF: {CPF}</p>
            </TextContainer>
            <Link to="/" onClick={limpar} data-test="go-home-btn">
                <button>Voltar para Home</button>
            </Link>

        </PageContainer3>
    )
}