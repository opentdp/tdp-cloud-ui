import { CamClient } from './cam';
import { DnspodClient } from './dnspod';
import { LighthouseClient } from './lighthouse';

export default {
    cam: new CamClient(),
    dnspod: new DnspodClient(),
    lighthouse: new LighthouseClient(),
};
