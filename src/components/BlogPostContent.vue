<template>
  <div>
    <VRuntimeTemplate :template="postContentTemplate" />
    <RiskDescription v-if="false" />
  </div>
</template>

<script>
import VRuntimeTemplate from "v-runtime-template";
import { decode } from "he";
import { mapState } from "vuex";
import RiskDescription from "@/components/RiskDescription.vue";

export default {
  components: { VRuntimeTemplate, RiskDescription },
  props: ["postContent"],
  computed: {
    ...mapState(["content"]),
    postContentTemplate() {
      let rendered_content = this.postContent;
      rendered_content = rendered_content.replace(
        /<pre class="wp-block-code make-it-real"><code>([\s\S]*?)<\/code><\/pre>/,
        (match, group) => {
          console.log({match, group});
          return decodeURI(decode(group));
        }
      );
      console.log("Modified content: ", { rendered_content });
      return `<div>${rendered_content}</div>`;
    }
  }
};
</script>

