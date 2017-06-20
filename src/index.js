import React from 'react'
import { Provider, inject, observer } from 'mobx-react/native'

export const wrapper = stores => {
    return Component => {
        return props => (
            <Provider {...stores}><Component {...props} /></Provider>
        )
    }
}

export const connected = mapper => {
    return Component => {
        const observerComponent = observer(Component)
        if (typeof mapper === 'string') {
            return inject(mapper)(observerComponent)
        } else if (Array.isArray(mapper)) {
            return inject(...mapper)(observerComponent)
        } else if (typeof mapper === 'function') {
            return inject(mapper)(observerComponent)
        } else if (typeof mapper === 'undefined') {
            return inject(stores => stores)(observerComponent)
        }
    }
}

export default (stores,mapper)=>{
    return Component=>{
        const connectedComponent = connected(mapper)(Component)
        return wrapper(stores)(connectedComponent)
    }
}