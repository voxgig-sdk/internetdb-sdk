import { InternetdbEntityBase } from '../InternetdbEntityBase';
import type { InternetdbSDK } from '../InternetdbSDK';
import type { Control } from '../types';
import type { InfoIpGet, InfoIpGetListMatch } from '../InternetdbTypes';
declare class InfoIpGetEntity extends InternetdbEntityBase<InfoIpGet> {
    constructor(client: InternetdbSDK, entopts: any);
    make(this: InfoIpGetEntity): InfoIpGetEntity;
    list(this: any, reqmatch?: InfoIpGetListMatch, ctrl?: Control): Promise<InfoIpGetEntity[]>;
}
export { InfoIpGetEntity };
