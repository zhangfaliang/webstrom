var  htmlWebpackPlugins=require("html-webpack-plugin");
var openBrowserWebpackPlugin=require('open-browser-webpack-plugin');
 var ExtractTextPlugin = require("extract-text-webpack-plugin");
 var wenpack=require("webpack")
module.exports={
  //entry:"./app/index.js",//入口
  entry:{
    index:['./app/a.js','./app/b.js'],
    bundle:"./app/index.js"
  },
  output:{// 出口
    path:'./build/',//生成目录
    filename:"[name].[hash:8].js"// 生成的文件 填充上面的index和bundle
  },
  plugins:[
  new htmlWebpackPlugins({
      title:"欢迎",
      // 创建的html
    //  filename:'index.html',
      // yi模板生成
      template:'./index.html',
      // 依赖的js
      chunks:["index","bundle","common.js"]
  }),
  new openBrowserWebpackPlugin({url:"http://localhost:8082"}),// 打开
  new ExtractTextPlugin("bundle.css"),//加载图片 64
   new wenpack.optimize.CommonsChunkPlugin('common.js'),// 合成公共部分
   new  wenpack.optimize.UglifyJsPlugin({// 压缩
  compress: {
    warnings: false
  }
}),


  ],
  module:{// 模块的导入方式
    loaders:[//所有的加载器
    // 匹配所有的css进行css和stle
    {test:/\.css$/,loader:ExtractTextPlugin.extract("style","css")},
    {test:/\.(jpg|png|gif)$/,loaders:["url?limit=8000"]}

    ]

  },
  // 添加路径名
  resolve:{
    // 扩展
    extensions:["",".js",".css",".json",".jsx"],

    // 配置简写
    alias:{
      pack:'./a/n/index1.js'
    }
  }
}
