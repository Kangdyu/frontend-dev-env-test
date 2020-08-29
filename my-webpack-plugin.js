class MyWebpackPlugin {
    apply(compiler) {
        // compiler.hooks.done.tap("My Plugin", (stats) => {
        //     console.log("MyPlugin: done");
        // });
        compiler.plugin("emit", (compilation, callback) => {
            const source = compilation.assets["main.js"].source();

            compilation.assets["main.js"].source = () => {
                const banner = [
                    "/**",
                    " * HI FROM MYWEBPACKPLUGIN",
                    " * Build Date: 2020-08-29",
                    " */",
                ].join("\n");

                return banner + "\n\n" + source;
            };

            callback();
        });
    }
}

module.exports = MyWebpackPlugin;
