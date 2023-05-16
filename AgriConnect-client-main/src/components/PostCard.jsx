import { useNavigate } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

import Post from './Post.jsx';
import '../styles/PostCard.css';

function PostCard({ props }) {

  const { id, body, user: { id: userId, username: username }, likesCount, commentsCount } = props;

  const navigate = useNavigate();

  return (
    <Card className="post_card">
      <Card.Header>{username}</Card.Header>
      <Card.Body onClick={ () => navigate('/post/'+id) } >
        <blockquote className="blockquote mb-0">
          <p>
            {' '}
            {body}
            {' '}
          </p>
          <footer className="blockquote-footer">
            {/* Someone famous in <cite title="Source Title">Source Title</cite> */}
            <div style={{ display:'flex', alignItems:'center', float: 'right', fontSize: '14px'  }}>
              likes: {likesCount} {'  '}
              comments: {commentsCount}
            </div>
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default PostCard;