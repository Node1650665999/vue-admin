module.exports = {
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }npm 
   
    devServer: {
      host:'localhost',
      port:'9001'
    },
    outputDir: process.env.outputDir,
}
