<template lang="pug">
  div
    div TIME:{{time}}
    div HP:{{hp}}
    div PC:{{pc}}
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
  hp: number = 0
  pc: number = 0

  @Watch('d.getTime', { deep: true })
  countTime() {
    this.time = this.d!.getTime!
  }

  @Watch('d.getHP', { deep: true })
  countHP() {
    this.hp = this.d!.getHP!
  }

  @Watch('d.getPlayerCount', { deep: true })
  playerCount() {
    this.pc = this.d!.getPlayerCount!
  }
}
</script>
