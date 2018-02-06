# BuffPanel SDK for Javascript on Web Browsers

The BuffPanel SDK is a library that is meant to be integrated into your website's pages. It provides a simple interface allowing you to send tracking data to the BuffPanel service.

To learn more about the BuffPanel service itself, please visit our [website](https://buffPanel.com/).

This version of the SDK is meant to be used within the landing pages of games and should work without any external libraries. Bellow is a section that lists all the currently supported browsers.

## Installation

To use the BuffPanel SDK in your website, you need to include the code snippet found in the `loader.js` file of this repository [(available here)](https://github.com/Cellense/buffpanel-sdk-javascript-webbrowser/blob/master/loader.js) in a `<script>` element somewhere in the HTML document.

We recommend placing it within the document's `<body>` tag, at the bottom, under any visible elements.

### Google Tag Manager

The BuffPanel SDK can also be loaded through the _Google Tag Manager_ service for easily managing multiple analytical solution code snippets.

For this to work, we need to setup the Tag Manager service to load the same code snippet, mentioned above when the page is loaded.

For more information on _Google Tag Manager_, visit their [site](https://www.google.com/analytics/tag-manager/).

## How it works

When included in an HTML document, the code snippet causes the web browser to asynchronously load the BuffPanel SDK library. It also creates a command queue, so you can use the call the SDK's methods even before it is loaded.

Once the library is fully loaded, all commands in the queue will be executed until the queue is emptied. Any newly issued commands will then be executed immediatly.

The code snippet creates a function called `BuffPanelSdk` in the global namespace (i.e. under the `window` object). You can issue commands from any place in the website's code where the `BuffPanelSdk` is visible, including event handlers.

### 3rd party service integration

Another use of the SDK is to collect data from third party services, we currently support:
- Google Analytics
- Facebook Pixel

The collected data is sent to the BuffPanel service and stored for the given user. The service can be configured through webhooks to later utilize this data to link a conversion (i.e. an attributed run event) to the same user's earlier click / impression within the external analytics solution.

## Command Reference

The following syntax is always used to call a command:

```js
BuffPanelSdk(<command_name>, <command_data>);
```

Here, `<command_name>` is a string identifier, that indicates which command is to be executed. The `<command_data>` is usually an object containing all the data required to execute the command.

If an entry is missing in the `<command data>` object, it can be loaded from the SDK's **storage**, granted a value for the same entry is set in it.

Most commands (with the execption of `initialize` and `populate` commands) communicate with the BuffPanel service by sending an HTTP request. This request is sent asynchronously and so allow the user to supply a callback function (as part of the `<command data>` parameter) which is called when the SDK receives a response.

The following is a list of all available commands with a description of their purpose, how they are called and what data do they expect.

### Populate

Used to populate the SDK's **storage** with implicit data and with data from any detected 3rd party services.

The following code snippet executes the command:
```js
BuffPanelSdk('populate');
```

This command requires no data to be set.

This command is automatically executed as soon as the library is loaded and so it is usually not required to run it explicitly.

### Initialize

Used to set values in the SDK's **storage**. These may be later used as implicit parameters if an entry is missing in a command's data object to simplify the command calls.

The following code snippet executes the command:
```js
BuffPanelSdk('initialize', {
	game_token: 'example_game', // Non-empty string (optional).
	campaign_token: 'example_campaign_token', // Non-empty string (optional).
	measurement_url_token: 'example_measurement_url', // Non-empty string (optional).
	player_token: 'example_player', // Non-empty string (optional).
	click_event_key: '1', // Positive integer string (optional).
	run_event_key: '1', // Positive integer string (optional).
});
```

### Redirection click event

Used to trigger a click event creation against the redirection endpoint of the BuffPanel service.

The following code snippet executes the command:
```js
BuffPanelSdk('redirection_click_event', {
	game_token: 'example_game', // Non-empty string (optional, default = storage.game_token).
	campaign_token: 'example_campaign_token', // Non-empty string (optional, default = storage.campaign_token).
	measurement_url_token: 'example_measurement_url', // Non-empty string (optional, default = storage.measurement_url_token).
	attributes: {}, // String to non-empty string object (optional, default = {}).
	callback: function () {
		console.log('done')
	}, // Function (err?: object) => void (optional).
});
```

[//]: # (### Create click event)

[//]: # (### Create run event)

[//]: # (### Store click event)

[//]: # (### Store run event)

[//]: # (### Update click event)

[//]: # (### Update run event)
