import { useNavigate } from "react-router-dom"
import "./Home.scss"

const Home = () => {
    const navigate = useNavigate();
    function moveToProductPage() {
        navigate('/AllProducts')
    }

    return (
        <div className="conatiner" onClick={moveToProductPage}>
            <h1>This is my Home page click anywhere to go All Products page</h1>
        </div>
    )
}

export default Home