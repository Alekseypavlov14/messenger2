import { useNavigate } from "react-router";

export function useExit(reason) {
    const navigate = useNavigate()

    if (reason) navigate('/home')
}