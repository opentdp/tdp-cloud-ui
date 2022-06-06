import { CamClient } from './cloud/cam';
import { DnspodClient } from './cloud/dnspod';
import { LighthouseClient } from './cloud/lighthouse';

import { UserClient } from './local/user';

export default {
    cam: new CamClient(),
    dnspod: new DnspodClient(),
    lighthouse: new LighthouseClient(),

    user: new UserClient(),
};
