<template>
  <div>
    <halloween1 v-if="holiday === 'halloween' && index === '1'" />
    <halloween2 v-if="holiday === 'halloween' && index === '2'" />
    <halloween3 v-if="holiday === 'halloween' && index === '3'" />
    <halloween4 v-if="holiday === 'halloween' && index === '4'" />
  </div>
</template>

<script>
import getSeasonalEvent from "../utils/seasonalCheck";
import halloween1 from "@/assets/seasonal/halloween/seasonal1.svg";
import halloween2 from "@/assets/seasonal/halloween/seasonal2.svg";
import halloween3 from "@/assets/seasonal/halloween/seasonal3.svg";
import halloween4 from "@/assets/seasonal/halloween/seasonal4g.svg";

export default {
  props: {
    index: String
  },
  components: {
    halloween1,
    halloween2,
    halloween3,
    halloween4
  },
  computed: {
    holiday() {
      return getSeasonalEvent();
    }
  }
};
</script>
