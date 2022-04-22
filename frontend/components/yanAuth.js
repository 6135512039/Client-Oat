import { useRouter } from 'next/router'
import { useEffect } from 'react'

const yanAuth= WrappedComponent => {
    const Wrapper = props => {
        const { token } = props
        const router = useRouter()
        useEffect(() => {
            if (!token)
                router.push('/showYans')
        }, [token])
        return (<WrappedComponent {...props} />)
    }
    return Wrapper
}

export default yanAuth