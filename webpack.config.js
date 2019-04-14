const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
	main: ["@babel/polyfill", "./src/index.js"]
    }, 
    mode: "development", 
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
    resolve: { extensions: ["*", ".js", ".jsx"] }, 
    output: { 
	path: path.resolve(__dirname, "dist/"),
	publicPath: "/dist/", 
	filename: "bundle.js"
    },
    devServer: { 
	contentBase: path.join(__dirname, "public/"),
	port: 3000,
	publicPath: "http://localhost:3001/dist/",
	hotOnly: true
    },
    plugins: [new webpack.HotModuleReplacementPlugin()] 
    
};
