// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { MainUIPanel } from './MainUIPanel';
import { SidebarProvider } from './SidebarProvider';
import { AppModel } from './codeManipulation/appModel';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	const appModel = new AppModel();

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "venic" is now active!');

	const sidebarProvider = new SidebarProvider(context.extensionUri);

	context.subscriptions.push(
		vscode.window.registerWebviewViewProvider("venic-sidebar", sidebarProvider)
	  );
	  
	context.subscriptions.push(vscode.commands.registerCommand('venic.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Venic!');
		MainUIPanel.createOrShow(context.extensionUri);
		
	}));

	// context.subscriptions.push(vscode.commands.registerCommand('venic.createFolder', () => {
    // 	vscode.workspace.updateWorkspaceFolders(0,null,{uri: vscode.Uri.file('C:/Users/Hirush/Desktop/Sample'),name:'Venic Folder'});
	// 	vscode.window.showInformationMessage('New Folder Created!');
		
		
	// }));

	context.subscriptions.push(vscode.commands.registerCommand('venic.createFile', (file: vscode.Uri) => {
        appModel.createFileOrFolder('file', file ? appModel.findDir(file.fsPath) : '/');
    }));

    context.subscriptions.push(vscode.commands.registerCommand('venic.createFolder', (file: vscode.Uri) => {
        appModel.createFileOrFolder('folder', file ? appModel.findDir(file.fsPath) : '/');
    }));
}

// this method is called when your extension is deactivated
export function deactivate() {}
