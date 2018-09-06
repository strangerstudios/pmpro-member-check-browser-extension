# PMPro Member Check Browser extension

This is a Chrome Browser Extension that can be used to check if email addresses on websites you are viewing belong to members from your PMPro website.

## Installation

### Prerequisites
1. Install and activate Paid Memberships Pro.

### Install the WordPress plugin
1. Copy the /pmpro-member-check-api/ folder to your /wp-content/plugins/ folder on your WordPress site.
1. Optionally change the $secret_key value in the plugin for added security.
1. Activate the plugin.

### Install the Browser Extension
1. Copy the /chrome-extension/ folder onto your local computer somewhere.
1. Visit chrome://extensions in Chrome.
1. Toggle the Developer Mode toggle.
1. Click the Load unpacked button.
1. Navigate to the /chrome-extension/ folder and select it.

## Using the Extension
1. Open the developer toolbar console.
1. Load a web page like gmail/etc.
1. The console will log something like 'email@domain.com is a user of level 1' for any user email found.

## Next Steps
1. Add code to recognize Gmail and other typical sites/apps, then inject code to highlight the email/etc for members.
