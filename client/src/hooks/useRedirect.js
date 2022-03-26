import { useNavigate } from "react-router"

export function useRedirect() {
    const navigate = useNavigate()
    if ( !localStorage.getItem('user') ) {
        navigate('/register')
    }
}