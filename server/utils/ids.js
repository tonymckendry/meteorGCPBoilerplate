import { Helpers } from 'api/helpers'

Meteor.startup(() => {
    try {
        Helpers.insert({ _id: 'user_id_increment', value: 100000 })
    } catch (err) {
        // Will always get here once the doc's in place, so just ignore
    }
    try {
        Helpers.insert({ _id: 'question_id_increment', value: 100000 })
    } catch (err) {
        // Will always get here once the doc's in place, so just ignore
    }
})

const doAutoincrement = function (collection, callback) {
    let id
    switch (collection) {
        case 'users':
            id = 'user_id_increment'
            break
        case 'questions':
            id = 'question_id_increment'
            break
    }
    Helpers.rawCollection().findAndModify(
        {
            _id: id
        },
        [],
        {
            $inc: {
                value: 1
            }
        },
        {
            new: true
        },
        callback
    )
}

export const nextAutoincrement = function (collection) {
    return Meteor.wrapAsync(doAutoincrement)(collection).value
}
