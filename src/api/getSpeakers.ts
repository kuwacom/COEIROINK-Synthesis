import Config from '../config/config';
import { Speakers } from '../types/speakers';
import logger from '../utils/logger';

export async function getSpeakers() {
    try {
        const res = await fetch(Config.COEIROINKUrl + `/speakers`);
        if (!res.ok) return null;

        const data = await res.json() as Speakers;
        return data;
    } catch (error) {
        logger.error(error);
        return null;
    }
}