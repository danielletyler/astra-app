module.exports = function (api) {
    api.cache(true)
    return {
        presets: ['@babel/preset-react', '@babel/preset-env'],
        plugins: [
            [
                'module-resolver',
                {
                    root: ['./'],
                    extensions: [
                        '.ios.ts',
                        '.android.ts',
                        '.ts',
                        '.ios.tsx',
                        '.android.tsx',
                        '.tsx',
                        '.jsx',
                        '.js',
                        '.json',
                    ],
                    alias: {
                        '~screens': './screens',
                        '~components': './components',
                        '~constants': './constants',
                        '~assets': './assets',
                        '~config': './config',
                        '~models': './models/',
                        '~controllers': './controllers',
                    },
                },
            ],
        ],
    }
}
