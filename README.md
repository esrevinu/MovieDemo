
# MovieDemo

MovieDemo uses **nodejs+express+jade+mongodb+redis** to build a web application to manage and display the movie information 

##Installation

 - install node dependency
```
npm install
```
 - install bower dependency
```
bower install
```
 - install [mongodb](https://www.mongodb.com/download-center#community)


##Basic Functions

####User Module
 - Sign up
 - Sign in
 - Access control
####Movie Module
 - Display information
 - Tag management
 - Search by name 
####Admin Module
 - Manage movie information(CRUD)
 - Add new movie using douban API
####Comment Module
 - Comment to movie
 - Comment to other comments
 - Display comments by layers
##Features
####2016.8
- Save user's status by session and persist in mongodb
- Comment to other's comments
- Use grunt to build all project including hot-loader
- Introduce salt to the encryption
####2016.9
- Add unit test using mocha
