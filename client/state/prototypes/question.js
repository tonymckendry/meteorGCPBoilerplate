import { observable, action, computed } from 'mobx'

class Question {
    constructor (id, question) {
        this._question = question
    }

    @observable _question

    @action updateState = question => (this._question = question)

    @computed
    get id () {
        return this._question._id
    }

    @computed
    get title () {
        return this._question.title
    }

    @computed
    get description () {
        return this._question.description
    }

    @computed
    get isActive () {
        return this._question.active
    }
}

export default Question
