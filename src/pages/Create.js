import { useState } from "react"
import { useNavigate } from "react-router-dom"
import supabase   from "../config/supabaseClient"

const Create = () => {
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [method, setMethod] = useState('')
  const [rating, setRating] = useState('')
  const [formError, setFormError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!title || !method || !rating) {
      setFormError('Please fill in all the fields correctly')
      return
    }

    const { data, error } = await supabase
      .from('smoothies')
      .insert([{ title, method, rating }])

    if(error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly')
    }

    if (data) {
      console.log(data)
      setFormError(null)
      navigate('/')
    }
  }

  return (
    <div className="page create">
      <div className="page create">
        <form onSubmit={handleSubmit}>
          <label htmlFor="title">Title:</label>
          <input 
            id="title" 
            name="title" 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="method">Method:</label>
          <textarea 
            id="method" 
            name="method" 
            value={method} 
            onChange={(e) => setMethod(e.target.value)} 
           />

           <label htmlFor="rating">Rating:</label>
           <input 
            id="rating" 
            name="rating" 
            type="number" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
           />

           <button>Create Smoothie Recipe</button>

           { formError && <p className="error">{formError}</p> }
        </form>
      </div>
    </div>
  )
}

export default Create