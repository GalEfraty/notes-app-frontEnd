
//like 'using' in c# - getting acess to libraries in node.js
const path = require('path')


//when we run: "npm run webpack" it will take from the input to the output
module.exports = 
{
    //entry: input:
    entry:
    {
        index: ['babel-polyfill', './src/index.js'],
        edit: ['babel-polyfill', './src/edit.js']
    },
    output: 
    {
        //path: where we save the output. has to be a FULL path from the hard-drive root:
        path: path.resolve(__dirname, 'public/scripts'), //resolve allows to concat (+) cross platform servers
        filename: '[name]-bundle.js'
    },
    //the comands that will activate babel from webpack. rules is an array of object. 
    //our rule is that we want webpack will work with babel
    module: 
    {
        rules: 
        [
            {
                test: /\.js$/, //we want to make sure babel translating only files that ends with ".js"
                exclude: /node_modules/, //{means that babel wont translate whats inside node_modules folder}
                use: 
                {
                    loader: 'babel-loader',
                    options: {presets: ['env']}
                }
            }
        ]
    },
    devServer: 
    {
        contentBase: path.resolve(__dirname, 'public'), 
        publicPath: '/scripts/'
    },
    devtool: 'source-map'
}

//__dirname = the root folder of the project location eg: (('C:\1gal\לימודים\courses\JavaScript\MyCode\boilerplate'))
