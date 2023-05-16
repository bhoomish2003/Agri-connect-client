function Comments({ props: { comments } }) {
    return (
        <div className="comments">
            {
                comments.map((comment)=>(
                    <div className="comment">
                        {comment.user.username}
                        {comment.body}
                        {comment.createdAt}
                    </div>
                ))
            }
        </div>
    );
}

export default Comments;