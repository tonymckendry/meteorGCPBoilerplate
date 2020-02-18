import React, { Fragment } from 'react'

import List from '@material-ui/core/List'
import Paper from '@material-ui/core/Paper'

import OptionListItem from './optionListItem'

const OptionList = ({ options, checkable , deletable }) => {
    return (
        <Fragment>
            {options.length > 0 && (
                <Paper style={{ margin: 16 }}>
                    <List style={{ overflowY: 'auto', maxHeight: 252 }}>
                        {options.map((option, idx) => (
                            <OptionListItem
                                onCheckBoxToggle={e => {
                                    options[idx].checked = e.target.checked
                                }}
                                option={option}
                                key={`OptionItem.${idx}`}
                                checkable={checkable}
                                deletable={deletable}
                                divider={idx !== options.length - 1}
                                onButtonClick={() => removeOption(idx)} />
                        ))}
                    </List>
                </Paper>
            )}
        </Fragment>
    )
}

export default OptionList
