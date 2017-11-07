// Load local modules.
import action from '.../src/action'
import populate from '.../src/action/populate'

// Define the initialization callback.
const startup = () => {
	// Verify whether the library was loaded correctly.
	const main = window['BuffPanelSdk']
	if (main === undefined) {
		throw new Error('The BuffPanel SDK was not loaded correctly.')
	}

	// Collect all available data.
	populate()

	// Process any queued requests.
	if ('q' in main) {
		main.q.forEach((queuedEntry) => {
			action(queuedEntry.name, queuedEntry.data)
		})
		delete main.q
	}

	// Expose the sdk interface.
	window['BuffPanelSdk'] = action
}

// Ensure the initialization is triggered.
if (document.readyState === 'complete') {
	startup()
} else {
	if ('addEventListener' in window) {
		// W3C standard.
		window.addEventListener('load', startup, false)
	} else if ('attachEvent' in window) {
		// Microsoft IE.
		window['attachEvent']('onload', startup)
	}
}
