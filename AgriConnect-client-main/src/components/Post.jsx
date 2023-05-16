import { useEffect } from 'react';
import { useParams, useNavigate, Routes, Route } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';

import { Row, Col, Nav, Container } from 'react-bootstrap';

import PostCard from './PostCard.jsx';
import Comments from './Comments.jsx';
import Likes from './Likes.jsx';

function Post({ props: { loginInfo: { isLoggedIn } } }) {

  const { id } = useParams();

  const { data: postData, error: postError } = useQuery(POST_QUERY, { variables: { id: id }});

  const navigate = useNavigate();

  if(postError) {
    return <h1>{postError.message}</h1>
  }

  if(postData){
    console.log(postData);
  }

  if(!isLoggedIn) {
    return (
      <div>
          <Container>
              <Row>
                <Col style={ { textAlign: 'center'} }>
                  Please Login
                  <br/>
                  <a onClick={ ()=>navigate('/login') }>Login</a>
                </Col>
              </Row>
          </Container>
      </div>
    );
  }
  return (
    <div className="post" >
          <Container>
            <Row>
              Post
            </Row>
            <Row>
              <Col>
              {
                postData && 
                <PostCard props={postData.post}/>
              }
              </Col>
            </Row>
            <Row>
              <Col>
              {postData && 
                <div className="">
                  <Nav fill variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                      <Nav.Link onClick={()=>navigate('comments')}>Comments</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link onClick={()=>navigate('likes')}>Likes</Nav.Link>
                    </Nav.Item>
                  </Nav>
                  <Routes>
                    <Route path={'comments'} 
                      element={<Comments props={{ comments: postData.post.comments }} />} />
                    <Route path={'likes'} 
                      element={<Likes props={{ likes: postData.post.likes }} /> } />
                  </Routes>
                </div>
              }
              </Col>
            </Row>
          </Container>
    </div>
  )
}

const POST_QUERY = gql`
  query($id: ID!) {
    post: post(id: $id) {
      id
      user {
        username
      }
      body
      commentsCount
      comments {
        id
        user {
          username
        }
        body
        createdAt
      }
      likesCount
      likes {
        id
        user {
          username
        }
      }
    }
  }
`;

export default Post;
