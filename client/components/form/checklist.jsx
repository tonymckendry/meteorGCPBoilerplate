import React, { useContext } from 'react'
import { useObserver, useLocalStore } from 'mobx-react-lite'

import MUICheckbox from '@material-ui/core/Checkbox'

import { FormContext } from 'components/form'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const Checklist = ({ nameKey, items }) => {
    const formState = useContext(FormContext)
    const local = useLocalStore(() => ({
        selected: formState.values[nameKey] || []
    }))

    const handleChange = event => {
        const name = event.target.name
        const checked = event.target.checked
        const index = local.selected.indexOf(name)

        checked
            ? index === -1 && local.selected.push(event.target.name)
            : index !== -1 && local.selected.splice(index, 1)

        formState.onChange(nameKey, local.selected)
        formState.onBlur(nameKey)
    }

    return useObserver(() => (
        <List>
            {items.map(item => {
                const checked = local.selected.indexOf(item.value) !== -1
                return (
                    <ListItem divider key={item.value}>
                        <MUICheckbox
                            onChange={handleChange}
                            name={item.value}
                            color="primary"
                            checked={checked || false} />
                        <ListItemText primary={item.primary} secondary={item.secondary} />
                    </ListItem>
                )
            })}
        </List>
    ))
}
Checklist.defaultProps = {
    items: [],
}

export default Checklist
