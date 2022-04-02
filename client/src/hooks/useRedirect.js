import { useEffect } from "react"
import { useNavigate } from "react-router"

export function useRedirect() {
    const navigate = useNavigate()
    
    useEffect(() => {
        if ( localStorage.getItem('user') ) {
            navigate('/home')
        } else {
            navigate('/register')
        }
    }, [navigate])
}