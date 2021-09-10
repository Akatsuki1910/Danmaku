<template lang="pug">
  div
    div TIME:{{time}}
    div HITCOUNT:{{hitCount}}
</template>

<script lang="ts">
import { Vue, Component, Watch, Prop } from 'nuxt-property-decorator'
import Danmaku from './ts/index'
@Component({})
export default class StageTest extends Vue {
  @Prop({ type: Danmaku })
  d: Danmaku | undefined

  // data
  time: number = 0
  hitCount: number = 0

  @Watch('d.getTime', { deep: true })
  countTime() {
    this.time = this.d!.getTime!
  }

  @Watch('d.getHitCount', { deep: true })
  countHit() {
    this.hitCount = this.d!.getHitCount
  }
}
</script>
