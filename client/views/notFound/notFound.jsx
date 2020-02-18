import { observer } from 'mobx-react-lite'
import React from 'react'

import _404 from 'components/errors/404'

const NotFound = () => {
    return <_404 />
}

export default observer(NotFound)
