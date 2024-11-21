module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    net: false,
                    http: require.resolve('stream-http'),
                    https: require.resolve('https-browserify'),
                    querystring: require.resolve('querystring-es3'),
                },
            },
        },
    },
};