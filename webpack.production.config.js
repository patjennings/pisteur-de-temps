const path = require("path");
const webpack = require("webpack");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

module.exports = {
    entry: {
	main: ["@babel/polyfill", "./src/index.js"]
    },
    mode: 'production',
    externals: {
	'Config': JSON.stringify(config)
    },
    module: {
	rules: [
	    {
		test: /\.(js|jsx)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "babel-loader",
		options: {
		    presets: ["@babel/env"]
		}
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
		test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
		use: [{
                    loader: 'file-loader',
                    options: {
			name: '[name]?name=[path][name].[ext]&context=/src/assets/fonts',
			outputPath: 'assets/fonts/'
                    }
		}]
            },
	    {
		test: /\.(jpe?g|png|gif|svg)$/i,
		loader: 'file-loader?name=src/assets/images/[name].[ext]'
            }
	]
    },
    plugins: [
    	// new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
    	new CleanWebpackPlugin(),
    	new HtmlWebpackPlugin({
    	    title: 'Pisteur de temps - An app for tracking time',
	    template: 'index.template.ejs',
	    inject: 'body',
    	}),
	new webpack.DefinePlugin({
	    "process.env": {
		NODE_ENV: JSON.stringify("production"),
	    },
	}),
    ],
    optimization: {
	minimizer: [
	    new UglifyJSPlugin({
		sourceMap: true
	    }),
	]	
    },
    resolve: {
	alias: {
	    assets : path.resolve(__dirname, "src/assets/"),
	    utils : path.resolve(__dirname, "src/shared/utils/"), // pour charger les modules avec un simple utils/{modules}, plutôt que ../../../utils/{modules}
	    helpers : path.resolve(__dirname, "src/shared/helpers/"),
	    fetch : path.resolve(__dirname, "src/shared/fetch/"),
	    stores : path.resolve(__dirname, "src/shared/stores/"),
	    localisation : path.resolve(__dirname, "src/shared/localisation/"),
	    sharedComponents : path.resolve(__dirname, "src/shared/components/"),
	    externalJquery : path.resolve(__dirname, "node_modules/jquery/dist"), // les modules externes sont chargés dans src/index.js
	    externalPopper : path.resolve(__dirname, "node_modules/popper.js/dist"),
	    externalBootstrap : path.resolve(__dirname, "node_modules/bootstrap/dist/js")
	},
	// moduleDirectories: ["node_modules", "shared"],
	extensions: ["*", ".js", ".jsx", ".scss"]
    },
    output: {
	path: path.resolve(__dirname, "build-production/"),
	publicPath: "/",
	filename: "bundle-[hash].js"
    }
};
