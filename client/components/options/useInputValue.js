import { useState } from 'react'

const useInputValue = (initialValue = '') => {
    const [inputValue, setInputValue] = useState(initialValue)

    return {
        inputValue,
        changeInput: event => setInputValue(event.target.value),
        clearInput: () => setInputValue(''),
        keyInput: (event, callback) => {
            if (event.which === 13 || event.keyCode === 13) {
                event.preventDefault()
                callback(inputValue)
                return true
            }
            return false
        },
    }
}

export default useInputValue
