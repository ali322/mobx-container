import { Provider } from 'mobx-react'

const wrapper = stores => {
    return Component => {
        return props => (
            <Provider {...stores}><Component {...props} /></Provider>
        )
    }
}

export default wrapper