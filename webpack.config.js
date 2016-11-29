var _ = require('lodash');
var minimist = require('minimist');
var chalk = require('chalk');
var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');

var DEFAULT_TARGET = 'BUILD';

var DEFAULT_PARAMS = {
    resolve: {
        extensions: ['',
            '.webpack.js',
            '.web.js',
            '.tsx',
            '.ts',
            '.js',
            '.json',
        ]
    },
    entry: {
        main: './src/main.tsx'
    },
    output: {
        publicPath: '',
        filename: '[name].[chunkhash].js',
        sourceMapFilename: '[name].[chunkhash].map'
    },
    module: {
        loaders: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /(\.test.ts$|node_modules)/ },
            { test: /\.css$/, loader: "style-loader!css?-minimize!postcss", exclude: /node_modules/ },
            { test: /\.tpl.html/, loader: 'raw' },
            { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url', exclude: /node_modules/ }
        ]
    },
    postcss: function(webpack) {
        return [
            require('postcss-modules-local-by-default'),
            require('postcss-import')({
                addDependencyTo: webpack,
            }),
            require('postcss-cssnext'),
            // add your "plugins" here
            // ...
            // and if you want to compress,
            // just use css-loader option that already use cssnano under the hood
            require("postcss-browser-reporter")(),
            require("postcss-reporter")(),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            inject: 'body'
        }),
        new webpack.optimize.DedupePlugin()
    ].concat(_bootswatchWorkaround()),
    devServer: {
        contentBase: 'dev/',
        port: 8081
    },
    debug: true,
    progress: true,
    colors: true
};

var PARAMS_PER_TARGET = {

    DEV: {
        devtool: 'inline-source-map',
        output: {
            filename: '[name].js'
        },
        plugins: [
            new OpenBrowserWebpackPlugin({ url: 'http://localhost:8081/' })
        ]
    },

    BUILD: {
        output: {
            path: './build'
        },
        devtool: 'source-map',
        plugins: [
            new CleanWebpackPlugin(['build'])
        ]
    },

    DIST: {
        debug: false,
        output: {
            path: './dist'
        },
        plugins: [
            new CleanWebpackPlugin(['dist']),
            new webpack.optimize.UglifyJsPlugin()
        ]
    }

};

var target = _resolveBuildTarget(DEFAULT_TARGET);
var params = _.merge(DEFAULT_PARAMS, PARAMS_PER_TARGET[target], _mergeArraysCustomizer);

_printBuildInfo(target, params);

module.exports = params;

function _resolveBuildTarget(defaultTarget) {
    var target = minimist(process.argv.slice(2)).TARGET;
    if (!target) {
        console.log('No build target provided, using default target instead\n\n');
        target = defaultTarget;
    }
    return target;
}

function _printBuildInfo(target, params) {
    console.log('\nStarting ' + chalk.bold.green('"' + target + '"') + ' build');
    if (target === 'DEV') {
        console.log('Dev server: ' + chalk.bold.yellow('http://localhost:' + params.devServer.port) + '\n\n');
    } else {
        console.log('\n\n');
    }
}

function _mergeArraysCustomizer(a, b) {
    if (_.isArray(a)) {
        return a.concat(b);
    }
}

function _bootswatchWorkaround() {
    var extensions = ['eot', 'woff', 'woff2', 'ttf', 'svg'];

    return extensions.map(function(ext) {
        var regexp = new RegExp('^\.\.\/fonts\/glyphicons-halflings-regular\.' + ext + '$');
        var dest = 'bootswatch/bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.' + ext;
        return new webpack.NormalModuleReplacementPlugin(regexp, dest);
    });
}