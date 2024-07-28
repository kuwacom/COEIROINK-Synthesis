import Config from "@/config/config";
import { SpeakerInfo } from "@/types/response";
import logger from "@/utils/logger";

export default async function getSpeakerInfo(
    type: number,
) {
    try {
        const query = new URLSearchParams({
            styleId: type.toString()
        });
        const res = await fetch(
            Config.COEIROINKUrl + `/style_id_to_speaker_meta?${query}`,
            {
                method: 'POST'
            }
        );
        if (!res.ok) return null;

        const data = await res.json() as SpeakerInfo;
        return data;
    } catch (error) {
        logger.error(error);
        return null;
    }
}