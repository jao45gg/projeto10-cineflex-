import axios from "axios"
import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { PageContainer1, SessionContainer, ButtonsContainer, FooterContainer } from "../../style/styles";

export default function SessionsPage() {

    const { idFilme } = useParams()
    const [Secoes, setSecoes] = useState(null);

    useEffect(() => {
        const promisse = axios.get(`https://mock-api.driven.com.br/api/v8/cineflex/movies/${idFilme}/showtimes`)

        promisse.then((resposta) => setSecoes(resposta.data))
        promisse.catch((erro) => console.log(erro))
    }, [idFilme])

    if (Secoes === null) {
        return (
            <div>Carregando</div>
        )
    }

    return (
        <PageContainer1>
            Selecione o horário
            <div>
                {Secoes.days.map((s, index) =>
                    <SessionContainer key={index} data-test="movie-day">
                        {`${s.weekday} - ${s.date}`}
                        <ButtonsContainer>
                            {s.showtimes.map((t, index) =>
                                <Link to={`/assentos/${t.id}`} key={index} data-test="showtime">
                                    <button>{t.name}</button>
                                </Link>
                            )}
                        </ButtonsContainer>
                    </SessionContainer>
                )}
            </div>

            <FooterContainer data-test="footer">
                <div>
                    <img src={Secoes.posterURL} alt={Secoes.title} />
                </div>
                <div>
                    <p>{Secoes.title}</p>
                </div>
            </FooterContainer>

        </PageContainer1 >
    )
}