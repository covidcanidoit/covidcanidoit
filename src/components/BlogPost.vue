<template>
  <v-card>
    <v-card-title>
      <h2>{{ post.title.rendered }}</h2>
    </v-card-title>
    <v-card-subtitle>
      {{ post.date }}
    </v-card-subtitle>
    <v-card-text>
      <BlogPostContent :postContent="post.content.rendered" />
    </v-card-text>
  </v-card>
</template>

<script>
import BlogPostContent from "@/components/BlogPostContent.vue";

export default {
  components: { BlogPostContent },
  props: ["post"],
};
</script>

<style>
/*
 * Default WP Alignment Classes
 *****************************************************************************/

.aligncenter,.alignleft,.alignright {
  display: block;
  padding: 0;
}

.aligncenter {
  float: none;
  margin: .5em auto 1em;
}

.alignright {
  float: right;
  margin: .5em 0 1em 1em;
}

.alignleft {
  float: left;
  margin: .5em 1em 1em 0;
}

.wp-caption {
  padding: 5px 0;
  border: 1px solid #555;
  background: #444;
  text-align: center;
}

.wp-caption img {
  display: inline;
}

.wp-caption p.wp-caption-text {
  margin: 5px 0 0;
  padding: 0;
  text-align: center;
  font-size: 75%;
  font-weight: 100;
  font-style: italic;
  color: #ddd;
}
</style>
