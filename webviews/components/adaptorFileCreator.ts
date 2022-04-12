import {AppModel} from "./appModel";

export class AdaptorFileCreator{

    constructor(URI: string){
        this.createFolderUsingAdapter(URI);
    }
    createFolderUsingAdapter(fileName: string){
         const appModel = new AppModel();
         appModel.createFileOrFolder('folder', fileName ? appModel.findDir(fileName) : '/');
    }

}