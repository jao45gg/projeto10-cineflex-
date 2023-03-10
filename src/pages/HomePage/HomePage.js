import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { PageContainer, ListContainer, MovieContainer } from "../../style/styles";

export default function HomePage() {

    const [Filmes, setFilmes] = useState(null);

    useEffect(() => {
        const promisse = axios.get("https://mock-api.driven.com.br/api/v8/cineflex/movies")

        promisse.then((resposta) => setFilmes(resposta.data))
        promisse.catch((erro) => console.log(erro))
    }, [])

    if (Filmes === null) {
        return (
            <div>Carregando</div>
        )
    }

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {Filmes.map((f, index) =>
                    <Link to={`sessoes/${f.id}`} key={index}>
                        <MovieContainer data-test="movie">
                            <img src={f.posterURL} alt={f.title} />
                        </MovieContainer>
                    </Link>
                )}
            </ListContainer>

        </PageContainer>
    )
}