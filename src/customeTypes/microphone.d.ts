interface Mic {
    endian?: 'big' | 'little' | undefined;
    bitwidth?: 8 | 16 | 24 | undefined;
    rate?: 8000 | 16000 | 44100 | undefined;
    channels?: 1 | 2 | undefined;
    debug?:true;
    exitOnSilence?: 6 | undefined;
    device?: 'hw:0,0' | 'plughw:1,0' | 'default' | undefined;
    additionalParameters?: any;
    
}

export declare const mic : (_option: any)=>Mic;
