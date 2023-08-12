# Task Manager App By Chibuokem

[chibuokem-task-manager.netlify.app](chibuokem-task-manager.netlify.app)


### Features
This is a task manager app / to do list app which can create, read update and delete **Tasks**. This app was created using ***React.js.***

You can experience the app by clicking [this link](chibuokem-task-manager.netlify.app)

### If you wish to run the app on your local computer:

Run:

```bash
npm install && npm start
```

to install all `dependencies` needed.

When downloaded, you can make your changes on the `App.js` which contains the following code:

```js
import IndexPage from './Pages/IndexPage.jsx';

function App(){
  return(
    <IndexPage />
  )
}

export default App

```

You can update the `IndexPage.jsx` page which contains the following bits of code:

```jsx
  import {useState} from 'react'
// Update the functionality
  function IndexPage(){
   return(
    <form>
    {/* Update UI */}
    </form>
   )
  }
  export default IndexPage
```

You can run the file by running the following code on your `terminal`:
```bash
npm start
```

This will open the code on [localhost:3000](localhost:3000).

### Github Repo:
You can get the github repo at: [uwa-t1m.github.io/to_do_app](uwa-t1m.github.io/to_do_app)