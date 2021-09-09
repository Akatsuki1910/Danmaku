<template lang="pug">
  div
    div(ref="danmaku")
    div {{dTime}}
</template>

<script lang="ts">
import { Vue, Component, Ref, Watch } from 'nuxt-property-decorator'
import Danmaku from './ts/index'
@Component({})
export default class Danmakustage extends Vue {
  @Ref() readonly danmaku!: HTMLDivElement

  // data
  d: Danmaku | null = null
  t: number = 0

  get dTime() {
    return this.t
  }

  @Watch('d.time', { deep: true })
  countTime() {
    this.t = this.d!.dTime
  }

  // mounted
  mounted() {
    this.d = new Danmaku(this.danmaku)
    this.d.start()
  }
}
</script>
