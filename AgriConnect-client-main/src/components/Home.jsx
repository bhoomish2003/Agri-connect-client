import { useNavigate } from 'react-router';
import { useQuery, gql } from '@apollo/client';

import { Container, Row, Col } from 'react-bootstrap';

import PostCard from './PostCard.jsx';

function Home( { props: { loginInfo: { isLoggedIn } } } ) {

    const { data: postsData, error: postsError } = useQuery(POST_QUERY);

    const navigate = useNavigate();

    if(postsError) {
        return <h1>{postsError.message}</h1>
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
        <div className="home">
            <Container>
                <Row className="justify-content-md-center">
                    <h1>Posts...</h1>
                </Row>
                
                {postsData && 
                    postsData.posts.map((p) => (
                        <Row className='justify-content-md-center'>
                            <Col>
                                <PostCard props={ p } />
                             </Col>
                        </Row>
                    ))
                }
            </Container>
        </div>
    );
}

const POST_QUERY = gql`
    query {
        posts: allPosts {
            id
            body
            user {
                id
                username
            }
            likesCount
            commentsCount
        }
    }
`;

export default Home;
