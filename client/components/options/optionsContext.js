import React, { createContext, useState } from 'react'
export const OptionsContext = createContext({})

export const OptionsProvider = ({ checkable, children, deletable, initialValues = [] }) => {
    const [options, setOptions] = useState(initialValues)
    const optionsContext = {
        options,
        setOptions,
        checkable,
        deletable,
        addOption: primary => {
            if (primary !== '') {
                setOptions(options.concat({ primary }))
            }
        },
        checkOption: idx => {
            setOptions(
                options.map((option, index) => {
                    if (idx === index) option.checked = !option.checked
                    return option
                })
            )
        },
        removeOption: idx => {
            setOptions(options.filter((option, index) => idx !== index))
        }
    }
    return <OptionsContext.Provider value={optionsContext}>{children}</OptionsContext.Provider>
}

export const { OptionsConsumer } = OptionsContext
