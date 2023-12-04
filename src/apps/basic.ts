import { Vue as BaseVue } from 'vue-facing-decorator';

import useCache from '@/store/cache';
import layoutStore from '@/store/layout';
import sessionStore from '@/store/session';

export * from 'vue-facing-decorator';

export class Vue extends BaseVue {
    public loading = false;
    public cache = useCache();
    public layout = layoutStore();
    public session = sessionStore();
}
