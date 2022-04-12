/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MainUIPanel = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
class MainUIPanel {
    constructor(panel, extensionUri) {
        this._disposables = [];
        this._panel = panel;
        this._extensionUri = extensionUri;
        // Set the webview's initial html content
        this._update();
        // Listen for when the panel is disposed
        // This happens when the user closes the panel or when the panel is closed programatically
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        // // Handle messages from the webview
        // this._panel.webview.onDidReceiveMessage(
        //   (message) => {
        //     switch (message.command) {
        //       case "alert":
        //         vscode.window.showErrorMessage(message.text);
        //         return;
        //     }
        //   },
        //   null,
        //   this._disposables
        // );
    }
    static createOrShow(extensionUri) {
        const column = vscode.window.activeTextEditor
            ? vscode.window.activeTextEditor.viewColumn
            : undefined;
        // If we already have a panel, show it.
        if (MainUIPanel.currentPanel) {
            MainUIPanel.currentPanel._panel.reveal(column);
            MainUIPanel.currentPanel._update();
            return;
        }
        // Otherwise, create a new panel.
        const panel = vscode.window.createWebviewPanel(MainUIPanel.viewType, "Venic", column || vscode.ViewColumn.One, {
            // Enable javascript in the webview
            enableScripts: true,
            // And restrict the webview to only loading content from our extension's `media` directory.
            localResourceRoots: [
                vscode.Uri.joinPath(extensionUri, "media"),
                vscode.Uri.joinPath(extensionUri, "out/compiled"),
            ],
        });
        MainUIPanel.currentPanel = new MainUIPanel(panel, extensionUri);
    }
    static kill() {
        MainUIPanel.currentPanel?.dispose();
        MainUIPanel.currentPanel = undefined;
    }
    static revive(panel, extensionUri) {
        MainUIPanel.currentPanel = new MainUIPanel(panel, extensionUri);
    }
    dispose() {
        MainUIPanel.currentPanel = undefined;
        // Clean up our resources
        this._panel.dispose();
        while (this._disposables.length) {
            const x = this._disposables.pop();
            if (x) {
                x.dispose();
            }
        }
    }
    async _update() {
        const webview = this._panel.webview;
        this._panel.webview.html = this._getHtmlForWebview(webview);
        webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
                // case "tokens": {
                //   await Util.globalState.update(accessTokenKey, data.accessToken);
                //   await Util.globalState.update(refreshTokenKey, data.refreshToken);
                //   break;
                // }
            }
        });
    }
    _getHtmlForWebview(webview) {
        // // And the uri we use to load this script in the webview
        const styleMainUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out/compiled", "mainUI.js"));
        // Uri to load styles into webview
        const stylesMicrophoneUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "microphone.css"));
        // const styleTextFieldUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "media", "textField.css")
        // );
        // const stylesMainUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
        // );
        // const cssUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "out", "compiled/swiper.css")
        // );
        // // Use a nonce to only allow specific scripts to be run
        const nonce = (0, getNonce_1.getNonce)();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="${stylesMicrophoneUri}" rel="stylesheet">
        <link href="${styleMainUri}" rel="stylesheet">
        <script nonce="${nonce}">
        </script>
			</head>
      <body>
			</body>
      <script src="${styleMainUri}" nonce="${nonce}">
			</html>`;
    }
}
exports.MainUIPanel = MainUIPanel;
MainUIPanel.viewType = "hello-world";


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNonce = void 0;
function getNonce() {
    let text = "";
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.getNonce = getNonce;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarProvider = void 0;
const vscode = __webpack_require__(1);
const getNonce_1 = __webpack_require__(3);
//import {microphoneWave} from "./microphoneWave";
//import { getTrans } from "./getTrans";
class SidebarProvider {
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case "onInfo": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case "onError": {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview) {
        // const styleResetUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
        // );
        // const styleVSCodeUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
        // );
        const styleTextFieldUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "textField.css"));
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "out", "compiled/mainUI.js"));
        // const styleMainUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
        // );
        const stylesMicrophoneUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, "media", "microphone.css"));
        // const scripUri = webview.asWebviewUri(
        //     vscode.Uri.joinPath(this._extensionUri, "out", "complied/mainUI.js")
        // );
        // const scripMicUri = webview.asWebviewUri(
        //   vscode.Uri.joinPath(this._extensionUri, "webviews", "pages/microphoneTest.js")
        // );
        // const scriptPathOnDisk = vscode.Uri.file(
        //   path.join(context., 'media', 'main.js')
        // )
        // And the uri we use to load this script in the webview
        //const scriptUri2 = scripAxiostUri.with({ scheme: 'vscode-resource' })
        // Use a nonce to only allow a specific script to be run.
        const nonce = (0, getNonce_1.getNonce)();
        //microphoneWave();
        //getTrans();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce. -->
        
          <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
  
        <!-- <script src="https://unpkg.com/axios@0.2.1/dist/axios.js" ></script>  -->
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <link href="${styleTextFieldUri}" rel="stylesheet">
            <link href="${stylesMicrophoneUri}" rel="stylesheet">
    
	    </head>
        <body>
        <script nonce="${nonce}" src="${scriptUri}"></script>
		</body>
		</html>`;
    }
}
exports.SidebarProvider = SidebarProvider;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModel = void 0;
const vscode = __webpack_require__(1);
const fs = __webpack_require__(6);
const path = __webpack_require__(7);
class AppModel {
    createFileOrFolder(taskType, relativePath) {
        relativePath = relativePath || '/';
        let projectRoot = "";
        if (vscode.workspace.workspaceFolders) {
            projectRoot = vscode.workspace.workspaceFolders[0].uri.fsPath;
        }
        if (path.resolve(relativePath) === relativePath)
            relativePath = relativePath.substring(projectRoot.length).replace(/\\/g, "/");
        if (!relativePath.endsWith("/"))
            relativePath += '/';
        const basepath = projectRoot;
        vscode.window.showInputBox({
            value: relativePath || '/',
            prompt: `Create New ${taskType} (/path/subpath/to/${taskType})`,
            ignoreFocusOut: true,
            valueSelection: [-1, -1]
        }).then((fullpath) => {
            if (!fullpath)
                return;
            try {
                let paths = fullpath.split('>').map(e => e.trim());
                let targetpath = taskType === 'file' ? path.dirname(paths[0]) : paths[0];
                paths[0] = taskType === 'file' ? path.basename(paths[0]) : '/';
                targetpath = path.join(basepath, targetpath);
                paths = paths.map(e => path.join(targetpath, e));
                if (taskType === 'file')
                    this.makefiles(paths);
                else
                    this.makefolders(paths);
                vscode.window.showInformationMessage("Succssfully created!");
                setTimeout(() => {
                    if (taskType === 'file') {
                        let openPath = paths.find(path => fs.lstatSync(path).isFile());
                        if (!openPath)
                            return;
                        vscode.workspace.openTextDocument(openPath)
                            .then((editor) => {
                            if (!editor)
                                return;
                            vscode.window.showTextDocument(editor);
                        });
                    }
                }, 50);
            }
            catch (error) {
                this.logError(error);
                vscode.window.showErrorMessage("Somthing went wrong!");
            }
        });
    }
    makefiles(filepaths) {
        filepaths.forEach(filepath => this.makeFileSync(filepath));
    }
    makefolders(files) {
        files.forEach(file => this.makeDirSync(file));
    }
    makeDirSync(dir) {
        if (fs.existsSync(dir))
            return;
        if (!fs.existsSync(path.dirname(dir))) {
            this.makeDirSync(path.dirname(dir));
        }
        fs.mkdirSync(dir);
    }
    makeFileSync(filename) {
        if (!fs.existsSync(filename)) {
            this.makeDirSync(path.dirname(filename));
            fs.createWriteStream(filename).close();
        }
    }
    findDir(filePath) {
        if (!filePath)
            return null;
        if (fs.statSync(filePath).isFile())
            return path.dirname(filePath);
        return filePath;
    }
    logError(error) {
        console.log("==============Error===============");
        console.log(error);
        console.log("===================================");
    }
}
exports.AppModel = AppModel;


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("path");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = __webpack_require__(1);
const MainUIPanel_1 = __webpack_require__(2);
const SidebarProvider_1 = __webpack_require__(4);
const appModel_1 = __webpack_require__(5);
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    const appModel = new appModel_1.AppModel();
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "venic" is now active!');
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider("venic-sidebar", sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('venic.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Venic!');
        MainUIPanel_1.MainUIPanel.createOrShow(context.extensionUri);
    }));
    // context.subscriptions.push(vscode.commands.registerCommand('venic.createFolder', () => {
    // 	vscode.workspace.updateWorkspaceFolders(0,null,{uri: vscode.Uri.file('C:/Users/Hirush/Desktop/Sample'),name:'Venic Folder'});
    // 	vscode.window.showInformationMessage('New Folder Created!');
    // }));
    context.subscriptions.push(vscode.commands.registerCommand('venic.createFile', (file) => {
        appModel.createFileOrFolder('file', file ? appModel.findDir(file.fsPath) : '/');
    }));
    context.subscriptions.push(vscode.commands.registerCommand('venic.createFolder', (file) => {
        appModel.createFileOrFolder('folder', file ? appModel.findDir(file.fsPath) : '/');
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map