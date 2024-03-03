const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            crypto: require.resolve('crypto-browserify'),
            child_process: require.resolve('child_process-browserify'),
            http: require.resolve('stream-http'),
            timers: require.resolve('timers-browserify'),
            fs: require.resolve('browserify-fs'),
            net: require.resolve('net'),
            tls: require.resolve('tls'),
            dns: require.resolve('dns'),
            os: require.resolve('os-browserify/browser'),
            zlib: require.resolve('browserify-zlib'),
            stream: require.resolve('stream-browserify'),
        },
    },
};
