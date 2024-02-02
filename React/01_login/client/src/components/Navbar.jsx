import { Link } from 'react-router-dom'


export default function Navbar() {
    return (
        <div>
            <Link to="/">Home</Link><br />
            <Link to="/login">Login</Link><br />
            <Link to="/register">Register</Link>
        </div>
    )
}
