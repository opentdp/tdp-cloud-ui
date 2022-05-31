<template>
  <v-header />
  <v-sidebar />
  <div class="content-box" :class="{ 'content-collapse': collapse }">
    <v-tags></v-tags>
    <div class="content">
      <router-view v-slot="{ Component }">
        <transition name="move" mode="out-in">
          <keep-alive :include="tagsList">
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import vHeader from './header.vue'
import vSidebar from './sidebar.vue'
import vTags from './tags.vue'

export default {
  components: {
    vHeader,
    vSidebar,
    vTags,
  },
  setup() {
    const store = useStore()
    const tagsList = computed(() =>
      store.state.tagsList.map((item) => item.name)
    )
    const collapse = computed(() => store.state.collapse)
    return {
      tagsList,
      collapse,
    }
  },
}
</script>

<style scoped>
.content-box {
  position: absolute;
  left: 250px;
  right: 0;
  top: 70px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
  background: #f0f0f0;
}

.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
}

.content-collapse {
  left: 65px;
}

.move-enter-from,
.move-leave-to {
  opacity: 0;
}

.move-enter-active,
.move-leave-active {
  transition: opacity .1s ease;
}
</style>