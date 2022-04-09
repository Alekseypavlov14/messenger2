import { useEffect } from "react"
import { useNavigate } from "react-router"
import { User } from "../modules/user/user"

export function useRedirect() {
    const navigate = useNavigate()
    
    useEffect(() => {
        if ( User.get() ) {
            navigate('/home')
        } else {
            navigate('/register')
        }
    }, [navigate])
}