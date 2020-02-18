import AppStore from './app'
import ForgotPasswordStore from './forgotPassword'
import LoginStore from './login'
import NotificationStore from './notifications'
import RouterStore from './router'
import UploaderStore from './uploader'
import UsersStore from './users'

class RootStore {
    constructor () {
        this.app = new AppStore(this)
        this.forgotPasswordStore = new ForgotPasswordStore(this)
        this.loginStore = new LoginStore(this)
        this.notification = new NotificationStore(this)
        this.router = new RouterStore(this)
        this.uploader = new UploaderStore(this)
        this.users = new UsersStore(this)
    }
}

const singleton = new RootStore()

export default singleton
