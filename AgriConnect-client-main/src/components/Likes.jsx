
function Likes({ props: { likes } }) {
    return (
        <div className="likes">
            {
                likes.map((like) =>(
                    <div className="like">
                        {like.user.username}
                        {like.createedAt}
                    </div>
                ))
            }
        </div>
    );
}

export default Likes;