# Zenbox

### Developing Locally

```
git clone
```

```
yarn
```

```
yarn start
```

This will run a development server at http://localhost:3000

#### Framework

[**Meteor**](https://www.meteor.com/)

The biggest advantages Meteor gives us are the ability to build iOS and Android App Binaries using one Javascript codebase as well as it's tight DDP integration with MongoDB which allows for true
real-time reactivity. It also comes with some nice stuff built in, like the user accounts and oAuth packages. Ultimately, it is the backbone of the entire App.

### Frontend Layout and Design

[**Material Design Guidelines**](https://material.io/guidelines/)

[**Material-Ui**](http://www.material-ui.com/#/)

Material-UI is our UI Kit, it has a ton of great stuff built in, and allows you to very easily theme and re-theme the color scheme of the whole app on the fly. Try to follow the Material design
guidelines from Google as closely as possible and avoid doing lots of unnecessary customization to the MUI components

### State Management

[**MobX**](https://mobx.js.org/)

MobX controls everything about the frontend of the App - it hooks into the Meteor DDP connection to the server/DB and maintains real time reactivity to any changes in data that may occur in the
database while also acting as the management for every state in the UI.

### Database

[MongoDB](https://www.mongodb.com/)

I reccomend using [RoboMongo](https://robomongo.org/) as a GUI database tool for developing locally

#### Contributing

Make your own fork of this repo and then submit a Pull Request with your changes and additions

##### Example Component Structure

```js
import React from 'react'
import { useObserver } from 'mobx-react-lite'
import { makeStyles } from '@material-ui/core/styles'

const MyComponent = () => {
    const classes = useStyles()
    return useObserver(()=> (<div className={classes.container}>{/*  Additional JSX  */}</div>))
}

const useStyles = makeStyles({
    container: {
        height: 100
    }
}

export default MyComponent
```
