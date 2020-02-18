import isUndefined from 'lodash.isundefined'
import { Accounts } from 'meteor/accounts-base'
import { Meteor } from 'meteor/meteor'
import { getData } from 'server/utils/getData'
import { nextAutoincrement } from 'server/utils/ids'

Accounts.onCreateUser((options, user) => {
    const customizedUser = { ...user, profile: { id: nextAutoincrement('users').value, ...options.profile } }
    return customizedUser
})

Meteor.methods({
    'password.resetEmail': function (email) {
        let user = Meteor.users.findOne({
            'emails.address': { $regex: new RegExp('^' + email, 'i') }
        })
        if (!isUndefined(user)) {
            Accounts.sendResetPasswordEmail(user._id)
        } else {
            return 'invalid'
        }
    },
    'user.update': payload => {
        Meteor.users.update({ _id: payload.userId }, { $set: { [payload.key]: payload.value } })
    },
    'user.profile.update': (_id, payload) => {
        const { email, ...profile } = payload
        // console.dir({ email, profile }, { depth: null, colors: true })
        Meteor.users.update(
            { _id },
            { $set: {
                profile,
                'emails.0.address': email,
            } })
    },
    'users.get': function (options) {
        return getData(Meteor.users, options)
    }
})
