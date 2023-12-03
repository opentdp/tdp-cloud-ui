import { CloudflareVendor } from './base';

import { ZonesModel } from './zones';


export default {
    vendor: CloudflareVendor,

    zones: new ZonesModel(),
};
