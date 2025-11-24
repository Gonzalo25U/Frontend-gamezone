module.exports = function (config) {
  config.set({
    // Base path, confiramr desde donde comienza a ejecutar, en este caso la raíz del proyecto = ("")
    basePath: "",

    // Frameworks de testing
    frameworks: ["jasmine"],

    // Archivos de tests
    files: [
        'src/test/*.spec.js',
        'src/test/*.spec.jsx'
        ],

    // Modifican la forma en que se procesan los archivos antes de ejecutarlos en el navegador
    preprocessors: {
      "src/test/**/*.spec.js": ["webpack", "sourcemap"],
      "src/test/**/*.spec.jsx": ["webpack", "sourcemap"],
    },

    // Configuración de Webpack
    // Toma todos los archivos y los procesa antes de pasárselos a Karma
    webpack: {
      mode: "development",
      module: {
        rules: [
          // JSX/JS
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ["@babel/preset-env", "@babel/preset-react"],
              },
            },
          },
          // CSS 
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          // Archivos binarios (imágenes, fuentes, etc.)
          {
            test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot)$/,
            type: "asset",
          },
        ],
      },
      resolve: {
        extensions: [".js", ".jsx"],
      },
    },

    webpackMiddleware: {
      stats: "errors-only",
    },

    // Reportes de Karma
    reporters: ["progress", "kjhtml",'spec'],

    client: {
      // Mantiene el resultado en el navegador
      clearContext: false, 
    },

    // Navegadores para ejecutar tests
    browsers: ["Chrome"],
    // Alternativa sin GUI: browsers: ['Chrome'],

    // vuelve a ejecutar los tests automáticamente cada vez que detecta un cambio.
    autoWatch: true,
    // determina si Karma debe ejecutarse una vez y salir o seguir ejecutándose.
    singleRun: false,
    // Es el tiempo máximo (en milisegundos) que Karma esperará para que el navegador se conecte después de ser lanzado
    captureTimeout: 60000,
  });
};
