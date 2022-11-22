import { getDatabase, ref, set, remove, onValue, off } from 'firebase/database';

class PostRespository {
  constructor() {
    this.database = getDatabase();
  }

  getPost(onRead) {
    const query = ref(this.database, `posts/`);

    onValue(query, snapshot => {
      const value = snapshot.val();
      value && onRead(value);
    });

    return () => off(query);
  }

  savePost(post, key) {
    set(
      ref(this.database, `posts/${post[key].type}/${post[key].key}`),
      post[key]
    );
  }

  removePost(post) {
    remove(ref(this.database, `posts/${post.type}/${post.key}`));
  }
}

export default PostRespository;
