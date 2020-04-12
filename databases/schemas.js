const Realm = require('realm');

// Define your models and their properties
const PostSchema = {
  name: 'Post',
  primaryKey:id,
  properties: {
    path:  'string',
    id: 'string',
    comments: 'Comment[]?',//comment[] can be null, ig post has no comments.
  }
};
const CommentSchema = {
  name: 'Comment',
  primaryKey:id,
  properties: {
    commentText:     'string',
    pictureId: 'string',
    id:     'string', 
    liked:  'bool'  
  }
};
const databaseOptions = {
    path: 'posts.realm',
    schema: [CommentSchema,PostSchema],
    schemaVersion: 0
  };
export const insertNewPost = newPost =>{
    Realm.open({schema: [PostSchema, CommentSchema]})
    .then(realm => {
        // Create Realm objects and write to local storage
        realm.write(() => {
            const myCar = realm.create('Post', newPost);
        });

        // Query Realm for all cars with a high mileage
        // const cars = realm.objects('Car').filtered('miles > 1000');

        // // Will return a Results object with our 1 car
        // cars.length // => 1

        // // Add another car
        // realm.write(() => {
        // const myCar = realm.create('Car', {
        //     make: 'Ford',
        //     model: 'Focus',
        //     miles: 2000,
        // });
        // });

        // // Query results are updated in realtime
        // cars.length // => 2

        // Remember to close the realm when finished.
        realm.close();
    })
    .catch(error => {
        console.log(error);
    });
}
export const queryAllPosts = () =>{
    Realm.open({schema: [PostSchema, CommentSchema]})
    .then(realm => {
        let allPosts = realm.objects('Post');
        return allPosts;
    }).catch(error => {
        console.log(error);
    });
}
export default new Realm({schema: [PostSchema, CommentSchema]})