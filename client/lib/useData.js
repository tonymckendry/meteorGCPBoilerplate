import queryString from 'query-string'
import { useState, useReducer, useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_OPTIONS':
            let newOptions = action
            delete newOptions.type
            return { ...state, ...newOptions }
        case 'SET_PAGE':
            return { ...state, page: action.page }
        case 'SET_DATA':
            return { ...state, data: action.data }
        case 'SET_SORT_BY':
            return { ...state, sortBy: action.sortBy, sortDirection: 'asc' }
        case 'SET_SORT_DIRECTION':
            return { ...state, sortDirection: action.direction }
        case 'SET_SEARCH_TERM':
            return { ...state, searchTerm: action.searchTerm, page: 1 }
        default:
            return state
    }
}

export const useData = (method, columns) => {
    // tool that gets data and manages pagination
    //
    const location = useLocation()
    const history = useHistory()
    const params = useParams()
    const initialState = {
        perPage: 10,
        searchTerm: null,
        data: { results: [] },
        page: 1,
        searchFields: columns?.filter(c => c.search).map(c => c.field) || [],
        sortBy: columns?.find(c => c.defaultSort)?.field || 'id',
        sortDirection: 'asc',
        id: params.id
    }

    const [state, dispatch] = useReducer(reducer, initialState) // might need swapped check docs

    const [loading, setLoading] = useState(false)

    const setPage = page => {
        let queryParams = queryString.parse(location.search)
        queryParams.page = page
        history.push({ pathname: location.pathname, search: queryString.stringify(queryParams) })
    }

    const setSort = field => {
        let queryParams = queryString.parse(location.search)
        if (state.sortBy === field) {
            const direction = state.sortDirection === 'asc' ? 'desc' : 'asc'
            queryParams.sortDirection = direction
            history.push({ pathname: location.pathname, search: queryString.stringify(queryParams) })
        } else {
            queryParams.sortDirection = 'asc'
            queryParams.sortBy = field
            history.push({ pathname: location.pathname, search: queryString.stringify(queryParams) })
        }
    }

    const setSearch = term => {
        let queryParams = queryString.parse(location.search)
        queryParams.page = 1
        if (term) {
            queryParams.searchTerm = term
        } else {
            delete queryParams.searchTerm
        }
        history.push({ pathname: location.pathname, search: queryString.stringify(queryParams) })
    }

    useEffect(() => {
        // fetch data - will refire when query params update
        setLoading(true)
        const queryParams = queryString.parse(location.search)
        const newOptions = { ...state, ...queryParams, searchTerm: queryParams.searchTerm }
        delete newOptions.data
        dispatch({ type: 'SET_OPTIONS', ...newOptions })
        Meteor.call(method, newOptions, (err, res) => {
            if (err) {
                console.error(err)
            } else {
                dispatch({ type: 'SET_DATA', data: res })
                setLoading(false)
            }
        })
    }, [location.search])

    return {
        loading,
        setPage,
        setSort,
        setSearch,
        ...state
    }
}
