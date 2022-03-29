import { useEffect } from "react"
import { useNavigate } from "react-router"

export function useRedirect() {
    const navigate = useNavigate()
    useEffect(() => {
        if (window.history.length >= 2) {
            window.open('', '_self').window.close();
        }
        if ( localStorage.getItem('user') ) {
            navigate('/home')
        } else {
            navigate('/register')
        }
    }, [navigate])
}