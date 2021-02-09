import { firebaseDatabase } from './firebase';

class PostRespository{
    getPost(onRead){
        const ref = firebaseDatabase.ref(`posts/`);
        
        ref.on('value', (snapshot) => {
            const value = snapshot.val();
            value && onRead(value);
        });

        return () => { ref.off() };
    }

    savePost(post, key){
        firebaseDatabase.ref(`posts/${post[key].type}/${post[key].key}`).set(post[key]);
    }

    removePost(post){
        firebaseDatabase.ref(`posts/${post.type}/${post.key}`).remove();
    }
}

export default PostRespository;