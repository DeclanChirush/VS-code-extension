import * as vscode from "vscode";
import { getNonce } from "./getNonce";
//import {microphoneWave} from "./microphoneWave";
//import { getTrans } from "./getTrans";
import {AppModel} from "./codeManipulation/appModel";


export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
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
        case "createFile": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.msg);

          const appModel = new AppModel()
          appModel.createFileOrFolder("file",data.value);
    
          break;
        }
        case "createFolder": {
          if (!data.value) {
            return;
          }
          vscode.window.showInformationMessage(data.msg);

          const appModel = new AppModel()
          appModel.createFileOrFolder("folder",data.value);
    
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {

    // const styleResetUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "media", "reset.css")
    // );

    // const styleVSCodeUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "media", "vscode.css")
    // );

    const styleTextFieldUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "textField.css")
    );

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, "out", "compiled/mainUI.js")
    );

    // const styleMainUri = webview.asWebviewUri(
    //   vscode.Uri.joinPath(this._extensionUri, "out", "compiled/sidebar.css")
    // );

    const stylesMicrophoneUri = webview.asWebviewUri(
        vscode.Uri.joinPath(this._extensionUri, "media", "microphone.css")
      );
     
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
    const nonce = getNonce();
    
    //microphoneWave();
    
     //getTrans();
    

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce. -->
        
          <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${
            webview.cspSource
          }; script-src 'nonce-${nonce}';">
  
        <!-- <script src="https://unpkg.com/axios@0.2.1/dist/axios.js" ></script>  -->
		    <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
            <link href="${styleTextFieldUri}" rel="stylesheet">
            <link href="${stylesMicrophoneUri}" rel="stylesheet">

          <script nonce="${nonce}">
            const tsvscode = acquireVsCodeApi();
          </script>      
	    </head>
        <body>
        <script nonce="${nonce}" src="${scriptUri}"></script>
		</body>
		</html>`;
  }
}