const path = require('path');
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env) => {
    return {
        entry: './src/index.tsx',
        output: {
            path: path.resolve(__dirname, 'dist'), // Output directory for builds
            filename: 'bundle.js',
            publicPath: '/', // Important for DevServer to know where to serve the bundle
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js'], // File types to resolve
        },
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: 'babel-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader'],
                },
            ],
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html', // HTML template to inject the bundle
            }),
            new Dotenv({
                path: `./.env.${env.production ? "production" : "development"}`,
            }),
        ],
        devServer: {
            static: {
                directory: path.resolve(__dirname, 'public'), // Serve index.html from public folder
            },
            devMiddleware: {
                publicPath: '/', // Serve the bundle from memory, not file system
            },
            port: 3000,
            hot: true,
            historyApiFallback: true, // Ensures all routes go to index.html (useful for SPA)
        },
        mode: env.production ? "production" : "development",
    }
};