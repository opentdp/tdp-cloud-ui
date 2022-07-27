# TDP Cloud UI

[Cloud Panel](https://github.com/tdp-resource/cloud-panel) 的前端组件, 框架基于 [vue-admin-template](https://github.com/rehiy/vue-admin-template)

*注意*：此项目无法单独使用，需要配合 [TDP Cloud 后端源码](https://github.com/tdp-resource/tdp-cloud) 或者编译好的 [TDP Cloud 二进制程序](https://github.com/tdp-resource/tdp-cloud-ci/releases/tag/v0.0.11) 使用。

## 编译并打包

在项目目录运行  `build.bat` 或 `./build.sh`

## 运行开发服务

在项目目录运行  `serve.bat` 或 `./serve.sh`

## 开发 `vscode` 配置

项目编辑器推荐使用 `vscode`，并设置代码格式化插件如下

```json
{
    "[css]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[scss]": {
        "editor.defaultFormatter": "vscode.css-language-features"
    },
    "[html]": {
        "editor.defaultFormatter": "vscode.html-language-features"
    },
    "[json]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[typescript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[vue]": {
        "editor.defaultFormatter": "Vue.volar"
    }
}

```

# License

[GPL-3.0](https://opensource.org/licenses/GPL-3.0)


Copyright (c) 2022 TDP Cloud
