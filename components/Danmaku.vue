<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import Danmaku from './ts/index'
@Component({})
export default class Danmakustage extends Vue {
  mounted() {
    const d = new Danmaku()
    d.start()
  }
}
</script>
