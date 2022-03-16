import { API } from "../config/api"
import { Container } from "react-bootstrap"
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext"
import ReactPlayer from 'react-player'

//import components
import Header from "../components/Header"
import Buy from '../components/Buy'
import Login from '../components/Login'
import Register from '../components/Register'

export default function LandingPage() {

    document.title = 'Cinema Online'

    const navigate = useNavigate()
    const [state] = useContext(UserContext)
    const [buyModal, setBuyModal] = useState(false)
    const [modalRegister, setModalRegister] = useState(false)
    const [modalLogin, setModalLogin] = useState(false)
    const [film, setFilm] = useState([{
        category: '',
        createdAt: '',
        desc: '',
        id: '',
        link: '',
        price: '',
        thumbnail: '',
        title: '',
        updatedAt: '',
    }])

    const getFilm = () => {
        API.get('/film')
            .then((res, req) => {
                const response = res.data.data.film
                setFilm(response)
            }).catch((err) => {
                console.log(err)
            })
    }

    useEffect(() => {
        getFilm()
    }, [])

    // console.log(film)
    return (
        <>
            <Header />
            {/* poster here */}
            <div className="poster-container my-4 d-flex justify-content-center">
                <img src={film[0].poster} style={{ width: 1000, height: 370, objectFit: 'cover' }} />
                <div className="poster-caption">
                    <h1 className="mb-3">
                        <div style={{ color: ' #A52620' }}>{film[0].title}</div>
                    </h1>
                    <h5>
                        {film[0].category}
                    </h5>
                    <h5 style={{ color: '#CD2E71' }}>
                        {film[0].price}
                    </h5>
                    <div className="poster-desc">
                        {film[0].desc}
                    </div>

                    <button type="button" className="btn-pink mt-4"
                        onClick={state.isLogin ? () => setBuyModal(true) : () => setModalLogin(true)}
                    >
                        Buy Now</button>
                    <Buy
                        show={buyModal}
                        onHide={() => setBuyModal(false)}
                        idfilm={film[0].id}
                        buyModal={setBuyModal}
                        setModalLogin={setModalLogin}
                        setModalRegister={setModalRegister}
                    />

                    <Register
                        show={modalRegister}
                        onHide={() => setModalRegister(false)}
                        buyModal={setBuyModal}
                        setModalLogin={setModalLogin}
                        setModalRegister={setModalRegister} />

                    <Login
                        show={modalLogin}
                        buyModal={setBuyModal}
                        onHide={() => setModalLogin(false)}
                        setModalLogin={setModalRegister}
                        setModalRegister={setModalLogin}
                    />
                </div>
            </div>

            {/* list film here */}
            <div className='mb-3'>
                <h5>
                    List Film
                </h5>
                <Container className='mt-3 d-flex flex-wrap'>
                    {film.map((item, index) => {
                        return (
                            <div className='col-2 p-2' key={item.id} style={{ height: 225 }} >
                                <button onClick={state.isLogin ? () => navigate('/detail-film/' + item.id) : ''}
                                    style={{ background: 'unset', border: 'unset' }}>
                                    {/* <Link to={'/detail-film/' + item.id}> */}
                                    <img src={item.thumbnail} className='rounded img-fluid' style={{ maxHeight: 225, objectFit: 'cover' }} />
                                    {/* </Link> */}
                                </button>
                            </div>
                        )
                    })}
                </Container>
            </div>
        </>
    )
}