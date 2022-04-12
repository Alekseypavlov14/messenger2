import { useEffect } from "react"
import { useNavigate } from "react-router"

export function useActiveChat(activeChat) {
    const navigate = useNavigate()

    useEffect(() => {
        if (activeChat) return navigate('/chat')
        navigate('/home')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeChat])
}