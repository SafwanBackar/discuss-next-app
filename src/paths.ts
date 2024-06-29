const paths = {
  home() {
    return '/';
  },
  // slug means the dynamic route. Just convention. if we pick a particular topic, that is the slug of topic route.
  topicShow(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  postCreate(topicSlug: string) {
    return `/topics/${topicSlug}/posts/new`;
  },
  postShow(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};

export default paths;
