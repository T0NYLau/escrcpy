// vite.config.js
import { resolve } from "node:path";
import useI18n from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/@intlify/unplugin-vue-i18n/lib/vite.mjs";
import useVueRouter from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/unplugin-vue-router/dist/vite.js";
import useVue from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import useVueJsx from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import useUnoCSS from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/unocss/dist/vite.mjs";
import { defineConfig, mergeConfig } from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/vite/dist/node/index.js";
import useElectron from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/vite-plugin-electron/dist/simple.mjs";
import useRenderer from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/vite-plugin-electron-renderer/dist/index.mjs";
import useSvg from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/vite-svg-loader/index.js";

// postcss.config.js
import nested from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/postcss-nested/index.js";
import postcssScss from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/postcss-scss/lib/scss-syntax.mjs";
var postcss_config_default = {
  parser: postcssScss,
  plugins: [nested]
};

// src/plugins/auto.js
import useAutoImport from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/unplugin-auto-import/dist/vite.js";
import useAutoComponents from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/unplugin-vue-components/dist/vite.js";
import { VueRouterAutoImports } from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/unplugin-vue-router/dist/index.js";

// src/plugins/element-plus/auto.js
import { ElementPlusResolver } from "file:///E:/gitclone/escrcpy/escrcpy/node_modules/unplugin-vue-components/dist/resolvers.js";
var auto_default = ElementPlusResolver;

// src/plugins/auto.js
var resolvers = [auto_default()];
var auto_default2 = () => {
  return [
    useAutoImport({
      resolvers,
      imports: ["vue", "pinia", "@vueuse/core", VueRouterAutoImports],
      eslintrc: {
        enabled: true
      },
      dirs: [
        "src/hooks/*/index.js",
        "src/store/*/index.js"
      ]
    }),
    useAutoComponents({
      resolvers,
      dirs: "none"
    })
  ];
};

// vite.config.js
var alias = {
  $: resolve("src"),
  $root: resolve(),
  $docs: resolve("docs"),
  $renderer: resolve("src"),
  $electron: resolve("electron"),
  $control: resolve("control")
};
function mergeCommon(config, { command = "" } = {}) {
  return mergeConfig(
    {
      resolve: {
        alias
      }
    },
    config
  );
}
function vite_config_default(args) {
  return mergeCommon(
    defineConfig({
      server: {
        port: 1535
      },
      build: {
        rollupOptions: {
          input: {
            main: resolve("index.html"),
            control: resolve("control/index.html")
          }
        }
      },
      plugins: [
        useUnoCSS(),
        useSvg(),
        useVueRouter({
          exclude: ["src/pages/**/components"]
        }),
        useVue(),
        useVueJsx(),
        useI18n({
          include: [resolve("src/locales/languages/**")]
        }),
        useElectron({
          main: {
            entry: "electron/main.js",
            vite: mergeCommon({}, args)
          },
          preload: {
            input: "electron/preload.js",
            vite: mergeCommon({}, args)
          }
        }),
        useRenderer(),
        ...auto_default2()
      ],
      css: {
        postcss: postcss_config_default
      }
    })
  );
}
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiLCAicG9zdGNzcy5jb25maWcuanMiLCAic3JjL3BsdWdpbnMvYXV0by5qcyIsICJzcmMvcGx1Z2lucy9lbGVtZW50LXBsdXMvYXV0by5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXGdpdGNsb25lXFxcXGVzY3JjcHlcXFxcZXNjcmNweVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcZ2l0Y2xvbmVcXFxcZXNjcmNweVxcXFxlc2NyY3B5XFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9naXRjbG9uZS9lc2NyY3B5L2VzY3JjcHkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAnbm9kZTpwYXRoJ1xyXG5pbXBvcnQgdXNlSTE4biBmcm9tICdAaW50bGlmeS91bnBsdWdpbi12dWUtaTE4bi92aXRlJ1xyXG5pbXBvcnQgdXNlVnVlUm91dGVyIGZyb20gJ3VucGx1Z2luLXZ1ZS1yb3V0ZXIvdml0ZSdcclxuaW1wb3J0IHVzZVZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB1c2VWdWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IHVzZVVub0NTUyBmcm9tICd1bm9jc3Mvdml0ZSdcclxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBtZXJnZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXHJcblxyXG5pbXBvcnQgdXNlRWxlY3Ryb24gZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24vc2ltcGxlJ1xyXG5pbXBvcnQgdXNlUmVuZGVyZXIgZnJvbSAndml0ZS1wbHVnaW4tZWxlY3Ryb24tcmVuZGVyZXInXHJcbmltcG9ydCB1c2VTdmcgZnJvbSAndml0ZS1zdmctbG9hZGVyJ1xyXG5cclxuaW1wb3J0IHBvc3Rjc3NDb25maWcgZnJvbSAnLi9wb3N0Y3NzLmNvbmZpZy5qcydcclxuXHJcbmltcG9ydCB1c2VBdXRvSW1wb3J0cyBmcm9tICcuL3NyYy9wbHVnaW5zL2F1dG8uanMnXHJcblxyXG5jb25zdCBhbGlhcyA9IHtcclxuICAkOiByZXNvbHZlKCdzcmMnKSxcclxuICAkcm9vdDogcmVzb2x2ZSgpLFxyXG4gICRkb2NzOiByZXNvbHZlKCdkb2NzJyksXHJcbiAgJHJlbmRlcmVyOiByZXNvbHZlKCdzcmMnKSxcclxuICAkZWxlY3Ryb246IHJlc29sdmUoJ2VsZWN0cm9uJyksXHJcbiAgJGNvbnRyb2w6IHJlc29sdmUoJ2NvbnRyb2wnKSxcclxufVxyXG5cclxuZnVuY3Rpb24gbWVyZ2VDb21tb24oY29uZmlnLCB7IGNvbW1hbmQgPSAnJyB9ID0ge30pIHtcclxuICByZXR1cm4gbWVyZ2VDb25maWcoXHJcbiAgICB7XHJcbiAgICAgIHJlc29sdmU6IHtcclxuICAgICAgICBhbGlhcyxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBjb25maWcsXHJcbiAgKVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoYXJncykge1xyXG4gIHJldHVybiBtZXJnZUNvbW1vbihcclxuICAgIGRlZmluZUNvbmZpZyh7XHJcbiAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IDE1MzUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGJ1aWxkOiB7XHJcbiAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgICAgbWFpbjogcmVzb2x2ZSgnaW5kZXguaHRtbCcpLFxyXG4gICAgICAgICAgICBjb250cm9sOiByZXNvbHZlKCdjb250cm9sL2luZGV4Lmh0bWwnKSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgICAgcGx1Z2luczogW1xyXG4gICAgICAgIHVzZVVub0NTUygpLFxyXG4gICAgICAgIHVzZVN2ZygpLFxyXG4gICAgICAgIHVzZVZ1ZVJvdXRlcih7XHJcbiAgICAgICAgICBleGNsdWRlOiBbJ3NyYy9wYWdlcy8qKi9jb21wb25lbnRzJ10sXHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgdXNlVnVlKCksXHJcbiAgICAgICAgdXNlVnVlSnN4KCksXHJcbiAgICAgICAgdXNlSTE4bih7XHJcbiAgICAgICAgICBpbmNsdWRlOiBbcmVzb2x2ZSgnc3JjL2xvY2FsZXMvbGFuZ3VhZ2VzLyoqJyldLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICAgIHVzZUVsZWN0cm9uKHtcclxuICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgZW50cnk6ICdlbGVjdHJvbi9tYWluLmpzJyxcclxuICAgICAgICAgICAgdml0ZTogbWVyZ2VDb21tb24oe30sIGFyZ3MpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHByZWxvYWQ6IHtcclxuICAgICAgICAgICAgaW5wdXQ6ICdlbGVjdHJvbi9wcmVsb2FkLmpzJyxcclxuICAgICAgICAgICAgdml0ZTogbWVyZ2VDb21tb24oe30sIGFyZ3MpLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9KSxcclxuICAgICAgICB1c2VSZW5kZXJlcigpLFxyXG4gICAgICAgIC4uLnVzZUF1dG9JbXBvcnRzKCksXHJcbiAgICAgIF0sXHJcbiAgICAgIGNzczoge1xyXG4gICAgICAgIHBvc3Rjc3M6IHBvc3Rjc3NDb25maWcsXHJcbiAgICAgIH0sXHJcbiAgICB9KSxcclxuICApXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRjbG9uZVxcXFxlc2NyY3B5XFxcXGVzY3JjcHlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXGdpdGNsb25lXFxcXGVzY3JjcHlcXFxcZXNjcmNweVxcXFxwb3N0Y3NzLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZ2l0Y2xvbmUvZXNjcmNweS9lc2NyY3B5L3Bvc3Rjc3MuY29uZmlnLmpzXCI7aW1wb3J0IG5lc3RlZCBmcm9tICdwb3N0Y3NzLW5lc3RlZCdcclxuaW1wb3J0IHBvc3Rjc3NTY3NzIGZyb20gJ3Bvc3Rjc3Mtc2NzcydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHtcclxuICBwYXJzZXI6IHBvc3Rjc3NTY3NzLFxyXG4gIHBsdWdpbnM6IFtuZXN0ZWRdLFxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcZ2l0Y2xvbmVcXFxcZXNjcmNweVxcXFxlc2NyY3B5XFxcXHNyY1xcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxnaXRjbG9uZVxcXFxlc2NyY3B5XFxcXGVzY3JjcHlcXFxcc3JjXFxcXHBsdWdpbnNcXFxcYXV0by5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovZ2l0Y2xvbmUvZXNjcmNweS9lc2NyY3B5L3NyYy9wbHVnaW5zL2F1dG8uanNcIjtpbXBvcnQgdXNlQXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5pbXBvcnQgdXNlQXV0b0NvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgVnVlUm91dGVyQXV0b0ltcG9ydHMgfSBmcm9tICd1bnBsdWdpbi12dWUtcm91dGVyJ1xyXG5cclxuaW1wb3J0IEVsZW1lbnRQbHVzIGZyb20gJy4vZWxlbWVudC1wbHVzL2F1dG8uanMnXHJcblxyXG5jb25zdCByZXNvbHZlcnMgPSBbRWxlbWVudFBsdXMoKV1cclxuXHJcbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcclxuICByZXR1cm4gW1xyXG4gICAgdXNlQXV0b0ltcG9ydCh7XHJcbiAgICAgIHJlc29sdmVycyxcclxuICAgICAgaW1wb3J0czogWyd2dWUnLCAncGluaWEnLCAnQHZ1ZXVzZS9jb3JlJywgVnVlUm91dGVyQXV0b0ltcG9ydHNdLFxyXG4gICAgICBlc2xpbnRyYzoge1xyXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXHJcbiAgICAgIH0sXHJcbiAgICAgIGRpcnM6IFtcclxuICAgICAgICAnc3JjL2hvb2tzLyovaW5kZXguanMnLFxyXG4gICAgICAgICdzcmMvc3RvcmUvKi9pbmRleC5qcycsXHJcbiAgICAgIF0sXHJcbiAgICB9KSxcclxuICAgIHVzZUF1dG9Db21wb25lbnRzKHtcclxuICAgICAgcmVzb2x2ZXJzLFxyXG4gICAgICBkaXJzOiAnbm9uZScsXHJcbiAgICB9KSxcclxuICBdXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxnaXRjbG9uZVxcXFxlc2NyY3B5XFxcXGVzY3JjcHlcXFxcc3JjXFxcXHBsdWdpbnNcXFxcZWxlbWVudC1wbHVzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxnaXRjbG9uZVxcXFxlc2NyY3B5XFxcXGVzY3JjcHlcXFxcc3JjXFxcXHBsdWdpbnNcXFxcZWxlbWVudC1wbHVzXFxcXGF1dG8uanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L2dpdGNsb25lL2VzY3JjcHkvZXNjcmNweS9zcmMvcGx1Z2lucy9lbGVtZW50LXBsdXMvYXV0by5qc1wiO2ltcG9ydCB7IEVsZW1lbnRQbHVzUmVzb2x2ZXIgfSBmcm9tICd1bnBsdWdpbi12dWUtY29tcG9uZW50cy9yZXNvbHZlcnMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBFbGVtZW50UGx1c1Jlc29s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
