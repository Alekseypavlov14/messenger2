import { useState, useEffect } from 'react'

export function useViewport() {
    // set 1 vh by window innerHeight to fix bag with Chrome
    const [vh, setVh] = useState(window.innerHeight * 0.01)
    window.addEventListener('resize', () => {
        const newVh = window.innerHeight * 0.01
        setVh(newVh)
    })
    useEffect(() => {
        document.documentElement.style.setProperty('--vh', `${vh}px`)
    }, [vh])
}