import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useExit(reason) {
    const navigate = useNavigate()

    useEffect(() => {
        if (!reason) navigate('/home')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [reason])
}