import React, { memo } from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'

import DeleteOutlined from '@material-ui/icons/DeleteOutlined'

const OptionListItem = memo(({
    checkable,
    checked,
    deletable,
    divider,
    onButtonClick,
    onCheckBoxToggle,
    option,
}) => {
    return (
        <ListItem divider={divider}>
            {checkable &&
                <Checkbox
                    onClick={onCheckBoxToggle}
                    checked={checked}
                    disableRipple />}
            <ListItemText {...option} />
            {deletable &&
                <ListItemSecondaryAction>
                    <IconButton aria-label="Delete Option" onClick={onButtonClick}>
                        <DeleteOutlined />
                    </IconButton>
                </ListItemSecondaryAction>}
        </ListItem>
    )
})

export default OptionListItem
