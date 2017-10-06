// Load scoped modules.
import config from '@player1os/config'

// Load npm modules.
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin'

// Load node modules.
import * as path from 'path'

// Expose the configuration object.
export default {
	entry: [
		// Include the project starting point into the bundle.
		path.join(config.APP_ROOT_PATH, 'src', 'index.ts'),
	],
	output: {
		// Define the directory for the compilation output.
		path: path.join(config.APP_ROOT_PATH, 'dist', 'web_sdk'),
		// Define the name for the compilation output.
		filename: 'sdk.js',
	},
	module: {
		// Specify a loader for all typescript source files that first compiles typescript into es2017 standards javascript
		// using the typescript compiler and then compiles that to javascript supported by the babel compiler.
		loaders: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			loader: 'awesome-typescript-loader',
		}],
	},
	resolve: {
		// Specify that the '#' character in imports should be resolved to the project's root path.
		alias: {
			'...': config.APP_ROOT_PATH,
		},
		// Specify that the typescript and javascript extensions can be ommitted from module names.
		extensions: [
			'.ts',
			'.js',
		],
	},
	plugins: [
		new UglifyJSPlugin(),
	],
	// Specify that a sourcemap should be created for the outputted bundle.
	devtool: 'source-map',
}
