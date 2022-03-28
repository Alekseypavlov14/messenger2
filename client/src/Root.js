import React from 'react'
import { useRedirect } from './hooks/useRedirect'

const Root = () => {
    useRedirect()
    return <div />
}

export default Root