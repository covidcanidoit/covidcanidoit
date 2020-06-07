<template>
  <div class="blog">
    <div v-for="post in posts" :key="post.id">
      <BlogPost :post="post" />

    </div>
  </div>
</template>

<script>
import axios from "axios";
import BlogPost from "@/components/BlogPost.vue";

export default {
  components: {
    BlogPost
  },
  data() {
    return {
      posts: []
    }
  },
  async created() {
    const posts_result = await(axios.get("https://public-api.wordpress.com/wp/v2/sites/covidcanidoit.wordpress.com/posts"));
    this.posts = posts_result.data;
  }
};
</script>
