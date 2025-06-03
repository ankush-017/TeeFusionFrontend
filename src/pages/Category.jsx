import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import API from './API.js'

function Category() {

  const navigate = useNavigate();

  // useEffect(()=>{
  //   API.get('/category')
  //   .then((res)=> console.log(res.data.message))
  //   .catch(()=>{ // token check from backend ...
  //     navigate('/login') // if token invalid
  //   })
  // },[navigate]);

  return (
    <>
      <div className='min-h-[80vh] flex justify-center items-center'>
        Category
      </div>
    </>
  )
}
export default Category;