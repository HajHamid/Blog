const paths = {
    home() {
        return "/";
    },
    postsShow() {
        return "/posts";
    },
    postDetail(slug: string) {
        return `/posts/${slug}`;
    },
    postCreate() {
        return '/posts/create'
    },
    postEdit(slug: string) {
        return `/posts/${slug}/edit`
    },
    categoriesShow() {
        return "/category";
    },
    categoryDetail(slug: string) {
        return `/category/${slug}`;
    },
    profile(){
        return '/profile'
    }
};

export default paths
