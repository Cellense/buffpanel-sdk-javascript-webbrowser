// Load app modules.
import createClickEvent from '.../src/action/create/click_event'
import createRunEvent from '.../src/action/create/run_event'
import initialize from '.../src/action/initialize'
import populate from '.../src/action/populate'
import redirectionClickEvent from '.../src/action/redirection_click_event'
import storeClickEvent from '.../src/action/store/click_event'
import storeRunEvent from '.../src/action/store/run_event'
import updateClickEvent from '.../src/action/update/click_event'
import updateRunEvent from '.../src/action/update/run_event'

export default (name: string, data: any) => {
	switch (name) {
		case 'create_click_event':
			createClickEvent(data)
			break
		case 'create_run_event':
			createRunEvent(data)
			break
		case 'initialize':
			initialize(data)
			break
		case 'populate':
			populate()
			break
		case 'redirection_click_event':
			redirectionClickEvent(data)
			break
		case 'store_click_event':
			storeClickEvent(data)
			break
		case 'store_run_event':
			storeRunEvent(data)
			break
		case 'update_click_event':
			updateClickEvent(data)
			break
		case 'update_run_event':
			updateRunEvent(data)
			break
		default:
			throw new Error(`The method "${name}" is not supported.`)
	}
}
