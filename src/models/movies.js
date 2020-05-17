export default class Movies {
    constructor(props) {
        super(props);

        this.state = {
            error: null,
            isLoaded: false,
            popular: [],
            upComing: [],
        }
    }

    fetchPopular() {
        fetch(
            "https: //api.themoviedb.org/3/movie/popular?api_key=e526577fc936f61b1a3711898d02e8dd&language=en-US&page=1",
            {
                method: "GET",
            }
        ).then(
            (result) => result.json()
        ).then(
            (result) => {
                console.log(result);
                this.setState({
                    isLoaded: true,
                    popular: result.results
                });
            }
        ).catch(
            (error) => this.setState({error, isLoaded: true})
        )
    }
}