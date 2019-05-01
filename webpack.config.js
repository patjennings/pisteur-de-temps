const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
	main: ["@babel/polyfill", "./src/index.js"]
    },
    mode: 'development',
    watch: true,
    module: {
	rules: [
	    {
		test: /\.(js|jsx)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "babel-loader",
		options: { presets: ["@babel/env"] }
	    },
	    {
		test: /\.scss$/,
		use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
		]
            },
	    {
		test: /\.(woff(2)?|ttf|eot|otf|svg)(\?v=\d+\.\d+\.\d+)?$/,
		use: [{
                    loader: 'file-loader',
                    options: {
			name: '[name]?name=[path][name].[ext]&context=/src/assets/fonts',
			outputPath: 'assets/fonts/'
                    }
		}]
            }
	]
    },
    resolve: {
	alias: {
	    assets : path.resolve(__dirname, "src/assets/"),
	    utils : path.resolve(__dirname, "src/shared/utils/"), // pour charger les modules avec un simple utils/{modules}, plutôt que ../../../utils/{modules}
	    fetch : path.resolve(__dirname, "src/shared/fetch/"),
	    stores : path.resolve(__dirname, "src/shared/stores/"),
	    sharedComponents : path.resolve(__dirname, "src/shared/components/")
	},
	// moduleDirectories: ["node_modules", "shared"],
	extensions: ["*", ".js", ".jsx"]
    },
    output: {
	path: path.resolve(__dirname, "dist/"),
	publicPath: "/dist/",
	filename: "bundle.js"
    }
};
