const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = {
    entry: {
	main: ["@babel/polyfill", "./src/index.js"]
    },
    mode: 'production',
    externals: {
	'Config': JSON.stringify(process.env.NODE_ENV === 'production' ? require('./config.prod.json') : require('./config.dev.json'))
    },
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
			name: '[name]?name=[path][name].[ext]&context=/assets/fonts',
			outputPath: 'assets/fonts/'
                    }
		}]
            }
	]
    },
    plugins: [
    	// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    	new CleanWebpackPlugin(),
    	new HtmlWebpackPlugin({
    	    title: 'Production',
    	}),
    ],
    optimization: {
	minimizer: [
	    new UglifyJSPlugin({
		sourceMap: true
	    }),
	]	
    },
    devServer: {
	contentBase: './build',
    },
    resolve: {
	alias: {
	    assets : path.resolve(__dirname, "assets/"),
	    utils : path.resolve(__dirname, "src/shared/utils/"), // pour charger les modules avec un simple utils/{modules}, plutôt que ../../../utils/{modules}
	    fetch : path.resolve(__dirname, "src/shared/fetch/"),
	    stores : path.resolve(__dirname, "src/shared/stores/"),
	    sharedComponents : path.resolve(__dirname, "src/shared/components/")
	},
	// moduleDirectories: ["node_modules", "shared"],
	extensions: ["*", ".js", ".jsx", ".scss"]
    },
    output: {
	path: path.resolve(__dirname, "build/"),
	publicPath: "/",
	filename: "bundle.js"
    }
};
