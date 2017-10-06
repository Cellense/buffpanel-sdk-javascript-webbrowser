// // Load app modules.
// import * as constant from '.../src/constant'
// import * as storage from '.../src/storage'
// import * as utility from '.../src/utility'

// // Define the internal properties.
// var internal = {
// 	urlBase: `'https://${constant}`,
// }

// Load app modules.
import action from '.../src/action'
import initialize from '.../src/initialize'

// Define the request processor.
const processAction = (name: string, data: any) => {
	if (!(name in action)) {
		throw new Error(`The method "${name}" is not supported.`)
	}
	action[name](data)
}

// Define the initialization callback.
const startup = () => {
	// Verify whether the library was loaded correctly.
	const main = window['BuffPanelSdk']
	if (!main) {
		throw new Error('The BuffPanel SDK was not loaded correctly.')
	}

	// Collect all available data.
	initialize()

	// Process any queued requests.
	main.q.forEach((queuedEntry) => {
		processAction(queuedEntry.name, queuedEntry.data)
	})
	delete main.q

	// Expose the sdk interface.
	window['BuffPanelSdk'] = processAction
}

// Ensure the initialization is triggered.
if (document.readyState === 'complete') {
	startup()
} else {
	if (window.addEventListener) {
		// W3C standard
		window.addEventListener('load', startup, false)
	} else if ('attachEvent' in window) {
		// Microsoft IE
		window['attachEvent']('onload', startup)
	}
}
