<template lang="pug">
  div(ref="danamaku")
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import Danmaku from './ts/index'
@Component({})
export default class Danmakustage extends Vue {
  @Ref() readonly danmaku!: HTMLDivElement

  mounted() {
    const d = new Danmaku(this.danmaku)
    d.start()
  }
}
</script>
