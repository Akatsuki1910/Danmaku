<template lang="pug">
  div
    div(ref="danmaku")
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'nuxt-property-decorator'
import Danmaku from './ts/index'
@Component({})
export default class DanmakuStage extends Vue {
  @Ref() readonly danmaku!: HTMLDivElement

  // data
  d: Danmaku | null = null

  // mounted
  mounted() {
    this.d = new Danmaku(this.danmaku)
    this.d.start()
  }
}
</script>
