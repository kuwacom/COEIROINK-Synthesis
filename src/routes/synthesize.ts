import getSpeakerInfo from '@/api/getSpeakerInfo';
import getAudioQuery from '@/api/getSpeakerInfo';
import getSynthesisBuffer from '@/api/getSynthesisBuffer';
import CacheManager from '@/utils/cacheManager';
import logger from '@/utils/logger';
import { Request, Response } from 'express';

export default async function synthesize(req: Request, res: Response) {
    logger.debug(`Request | method:GET | ${req.url}`);
    if (req.query.text === undefined) {
        res.status(400).json({
            error: "Bad Request"
        });
        logger.error(`Response | status:400 | ${req.url}`);
        return;
    }
    if (req.query.type === undefined) {
        req.query.type = '0'; // つくよみちゃん
    }
    if (req.query.pitch === undefined) {
        req.query.pitch = '0';
    }
    if (req.query.speed === undefined) {
        req.query.speed = '1.0';
    }
    if (req.query.volume === undefined) {
        req.query.volume = '1.0';
    }

    const cache = CacheManager.searchVoiceCache(
        Number(req.query.type),
        req.query.text as string,
    )

    if (cache) {
        res.type('audio/wav').status(200).end(cache);
        logger.debug(`Response | status:200 | ${req.url}`);
        return;
    }

    const speakerInfo = await getSpeakerInfo(
        Number(req.query.type)
    );

    if (!speakerInfo) {
        res.status(500).json({
            error: "can't get speakerInfo"
        });
        logger.error(`Response | status:500 | ${req.url}`);
        return;
    }

    const audioBuffer = await getSynthesisBuffer(
        {
            speakerUuid: speakerInfo.speakerUuid,
            styleId: speakerInfo.styleId,
            text: req.query.text as string,
            prosodyDetail: [],
            speedScale: Number(req.query.speed),
            pitchScale: Number(req.query.pitch),
            volumeScale: Number(req.query.volume),
            intonationScale: 1.0,
            prePhonemeLength: 0.1,
            postPhonemeLength: 0.5,
            outputSamplingRate: 24000
        },
    );

    if (!audioBuffer) {
        res.status(500).json({
            error: "can't get buffer"
        });
        logger.error(`Response | status:500 | ${req.url}`);
        return;
    }

    CacheManager.setVoiceCache(
        Number(req.query.type),
        req.query.text as string,
        audioBuffer
    )
    res.type('audio/wav').status(200).end(audioBuffer);
    logger.debug(`Response | status:200 | ${req.url}`);
    return;

}