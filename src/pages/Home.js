import supabase from "../config/supabaseClient"
import { useEffect, useState } from "react"
import SmoothieCard from "../components/SmoothieCard"

const Home = () => {
  const [fetchError, setFetchError] = useState(null)
  const [smoothies, setSmoothies] = useState(null)

  useEffect(() => {
    const fetchSmoothies = async () => {
      const { data, error } = await supabase
      .from('smoothies')
      .select()

      if(error) {
        setFetchError('Could not fetch the smoothies')
        setSmoothies(null)
        console.log(error)
      }

      if(data) {
        setSmoothies(data)
        setFetchError(null)
      }
    }

    fetchSmoothies()
  }, [])

  return (
    <div className="page home">
      { fetchError && (<p>{fetchError}</p>) }
      { smoothies && (
        <div className="smoothies">
          {/* order by buttons */}
          <div className="smoothie-grid">
            {smoothies.map(smoothie => (
              <SmoothieCard smoothie={smoothie} key={smoothie.id}/>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Home