You should create the .env file and add 
EMAIL="...."
PASSWORD="...."

Email and password here will be the company email which we would like to send message when someone submit form recruitment or contact.

********************************************
When you git clone this project, first of all you need to run command "dep ensure" to add all dependencies.


********************************************
In the file api.go, the channel slack for now is api_call_slack so if you want to config the channel to receive form from users please change the channel's name here.

********************************************
About the details of database, please check file config.go inside config folder.

********************************************
The authentication folder is responsible for login and check authenticated user.

********************************************
The db folder is responsible for communicate to database.

********************************************
The handler folder is responsible for logic rule.

********************************************
the model folder is responsible for define schema.

