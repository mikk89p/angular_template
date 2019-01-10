<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

Using href works fine to get started with the project quickly, but may not work for many scenarios, as lacks offline mode.

WRONG SOLUTION
npm install material-design-icons -> over 97k files and 300mb

CORRECT SOLUTION
Create a folder src/assets/fonts/material-icons/

The solution is to get the copy of the “iconfont” folder directly: 
https://github.com/google/material-design-icons/tree/master/iconfont

1) Faster dependency installs, especially when using CI
2) Offline mode