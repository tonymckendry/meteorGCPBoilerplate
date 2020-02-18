export const getData = (collection, options = {}) => {
    let query = {}
    if (options.id) {
        query._id = options.id
    }
    if (options.searchTerm && options.searchFields) {
        if (!query['$or']) {
            query['$or'] = []
        }
        options.searchFields.map(field => {
            query['$or'].push(
                { [field]: { $regex: options.searchTerm, $options: 'i' } },
            )
        })
    }
    let cleanup = {
        limit: options.perPage,
        skip: (options.page - 1) * options.perPage,
        sort: {
            [options.sortBy]: options.sortDirection === 'asc' ? 1 : -1
        }
    }
    let data = collection.find(query, cleanup)
    return {
        results: data.fetch(),
        total: data.count()
    }
}

// clients/:id
// clients/:id/questions (paginate)
