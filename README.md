React Native Android App.

Required Environment:
1.	Virtual (Android Studio) or real Android Device
Android Studio (if not real Android Device)
https://developer.android.com/studio
After installation, run android studio. In welcome page-configure, open SDK manager, install Android 9.0 (Pie). Check “show package details” in bottom right corner, after that make sure to check “Android SDK Platform 28”, “Intel x86 Atom_64 System Image” or “Google APIs Intel x86 Atom System Image” under Android 9.0 (Pie)

The SDK Manager can also be found within “Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK

Finally, click "Apply" to download and install the Android SDK and related build tools.
Look for the icon in upper right corner, click into it and create a new AVD, select "Create Virtual Device...", then pick any Phone from the list and click "Next", then select the Pie API Level 28 image. Click "Next" then "Finish" to create your AVD

 


2.	React native:
https://reactnative.dev/docs/environment-setup
For MacOS:
Officially, react native recommend us to use homebrew to install node and watchman. 
Besides, node can also be installed separately, as instructions in section3.
Node is an asynchronous event-driven JavaScript runtime
Watchman is a tool by Facebook for watching changes in the filesystem

Homebrew (only for MacOS and Linux):
In terminal:
//install homebrew
>/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

After install homebrew, we start to install node, watchman, Java Development Kit:
//install node in terminal use homebrew
>brew install node

//install watchman in terminal use homebrew
>brew install watchman

//install JDK in terminal use homebrew
>brew cask install adoptopenjdk/openjdk/adoptopenjdk8


For Windows:
Officially, react native recommend us to use chocolatey to install Node, JDK and Python2.
Besides, node can also be installed separately, as instructions below.
Open an Administrator Command Prompt (right click Command Prompt and select "Run as Administrator"), then run the following command
//install node, python2 and jdk in terminal use chocolatey
>choco install -y nodejs.install python2 jdk8



3.	Node/Nodejs (npm will be installed automatically):
As mentioned in section2, node can be installed by homebrew. Besides, it can also be installed from official website: https://nodejs.org/en/download/

take Mac System as example:
install from the website, then follow the steps and installation will be successful.
 


4.	Expressjs:
Instruction website: https://expressjs.com/en/starter/installing.html
The nodejs have to be installed first (npm will be installed automatically), 
In terminal:
//change the path to our app
>cd SportsApp

// install express and save in dependencies list
>npm install express –save

Download nodemon to automatically restart the server when you made changes to backend.
To install npm, install nodejs.
>npm i --save-dev nodemon



5.	MongoDB:

For MacOS:
In terminal:
>brew tap mongodb/brew
>brew install mongodb-community
//for me is mongod --dbpath=/usr/local/var/mongodb
//check where the mongodb is downloaded, then add in dbpath
>mongod --dbpath=/path/to/mongo/db

For windows:
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/
follow the procedures 

(MongoDB Compass is recommended to edit data:
https://www.mongodb.com/download-center/compass)
