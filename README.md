# VoxML-Track-Annotation-2021
Step 1: Install Node.js and Expo

1. Install Node.js from [this link](https://nodejs.org/dist/latest-v12.x/) (Install version 12.x as higher versions have a compatability issue)
2. Install Expo: `npm install --global expo-cli`

Step 2: Checkout the project

1. Checkout or download the `master` branch of this project from GitHub (make sure you get the right branch!)
2. `cd` to the project folder using the command line

Step 3: Install NPM and start Expo

1. Run `npm install` (If this throws errors then run `sudo npm install` on macOS/Linux, or restart your Windows command line with admin privileges)
2. Run `expo start`

This should open the project in a web browser.  On the left side panel click on "**Run in web browser**".

You will be asked to enter an email address as a unique ID.  This will be kept completely private and will only be used to track which images you have already annotated (read more in the guideline).

Please [**read the guideline first**](https://github.com/csu-signal/VoxML-Track-Annotation-2021/blob/main/ISA-17-guideline.pdf) and get started!

## Installation notes

We recommend running the tool on Mac or Linux.  The interface has been tested in Chrome on Windows as well and should work.

In the event that running `expo start` and clicking on "**Run in web browser**" doesn't automatically open a new browser window that redirects to the **VoxML Annotation Survey** interface, you should look in the command line output for a line like:
  `Project is running at http://0.0.0.0:XXXXX`
where `XXXXX` is a port number.  Open a new Chrome window and navigate to `localhost:XXXXX`.
