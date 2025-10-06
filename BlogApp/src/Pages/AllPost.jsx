import React,{useState,useEffect  } from 'react'
import appwriteService from '../Appwrite/configurations'
import { Container,PostCard } from '../components'
import appwriteService from '../Appwrite/configurations'

function AllPost() {
  const [posts,setPosts] = useState([])
  useEffect(() => {},[])
  appwriteService.getPost([]).then((posts) => {
    if(posts) {
      setPosts(posts)
    } else {
      setPosts([])
    }
  })
  return (
    <div className='w-full py-10'>
    <Container>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {posts.map((post) => (
          <div key={post.$id} className='col-span-1'>
            <PostCard post={post} />

          </div>
        ))}
      </div>
    </Container>
    </div>
  )
}

export default AllPost
