import Config from "@/config/config";
import { Synthesis } from "@/types/synthesis";
import logger from "@/utils/logger";

export default async function getSynthesisBuffer(
    synthesis: Synthesis
) {
    try {
        const res = await fetch(
            Config.COEIROINKUrl + `/synthesis`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(synthesis),
            }
        );
        if (!res.ok) return null;
        const data: ArrayBuffer = await res.arrayBuffer();
        return Buffer.from(data);
    } catch (error) {
        logger.error(error);
        return null;
    }
}