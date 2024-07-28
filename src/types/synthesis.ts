export type Synthesis = {
    speakerUuid: string;
    styleId: number;
    text: string;
    prosodyDetail:
        {
            phoneme: string;
            hira: string;
            accent: number;
        }[][] | [];
    speedScale: number;
    volumeScale: number;
    pitchScale: number;
    intonationScale: number;
    prePhonemeLength: number;
    postPhonemeLength: number;
    outputSamplingRate: number;
}