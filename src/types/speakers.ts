export type SpeakerInfo = {
    speakerUuid: string;
    styleId: number;
    speakerName: string;
    styleName: string;
}

export type SpeakersStyle = {
    name: string;
    id: number;
    type: string;
}

export type Speakers = {
    speakerName: string;
    speakerUuid: string;
    styles: {
            styleName: string;
            styleId: number;
            base64Icon: string | null;
            base64Portrait: string | null;
        }[];
    version: string;
    base64Portrait: string;
}[]