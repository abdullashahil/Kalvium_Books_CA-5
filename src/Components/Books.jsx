import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { useEffect, useState } from 'react';
import BookDetail from "./BookDetails";
import axios from 'axios';
import img from "./assets/asset1.png"
import dark from "./assets/moon.png"
import light from "./assets/light.png"

function Books(props) {

  const [ApiData, setApiData] = useState([]);
  const [search, setSearch] = useState('')
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true);
  const { darkmode, setDarkMode } = props;
  const [details, setBookDetails] = useState(null);

  const navigate = useNavigate()


  useEffect(() => {
    axios.get('https://reactnd-books-api.udacity.com/books', {
      headers: { 'Authorization': 'whatever-you-want' }
    })
      .then((response) => {
        const data = response.data.books;
        console.log(response)
        setApiData(data);
        setBooks(data);
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(true)
      });
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const bgStyle = darkmode ? { background: "rgb(18, 72, 112)" } : {};

  const closeDetails = () => {
    setBookDetails(null);
    navigate('/')
  }

  const openDetails = (item) => {
    setBookDetails({ book: item });
  }

  const handleChange = (e) => {
    setSearch(e.target.value)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkmode);
  };

  const filterBooks = books.filter((book) => {
    if (search === '') {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.includes(search.toLowerCase())
  })


  return (
    <div className="bg-red-500" style={bgStyle}>
      <div className="nav-books">
        <nav className='flex justify-between bg-gray-50 h-100 p-6'>

          <img className='h-9 ' src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="logo" />

          <input className="w-2/4 px-6 border font-notmal border-gray-400 rounded hover:border-black" {...register('bookname', {
          })} placeholder="Search Books" id="firstname" onChange={handleChange} />
          <img className="search h-7 top-8 " src="https://cdn-icons-png.flaticon.com/128/5636/5636698.png" alt="" />

          <div className="theme-btn flex items-center justify-between">
            <img className="h-8" src={darkmode ? light : dark} alt="" onClick={toggleDarkMode} />
            <Link to={'/register'}><button className="border border-white bg-red-500 p-2 px-6 rounded text-white font-bold hover:bg-gray-500 transition duration-300">Register</button></Link>


          </div>
        </nav>

        <center>
          <h1 className="head mt-12 text-white font-bold">Books</h1>

          {loading && <img className="loading  text-white font-bold" src={img} />}
          {details && details.book ? (
            <BookDetail details={details} closeDetails={closeDetails} />
          ) : (
            <div className="books mt-20  " >
              {filterBooks.map((item) => (
                <div className='container bg-white shadow-md border border-gray-400 rounded-xl ' onClick={() => openDetails(item)} key={item.id}>
                  <div className='subcontainer'>

                    <div className=" p-5 rating flex  justify-between">
                      <div className="avg-rating bg-gray-800 px-2 flex items-center justify-center h-7"><p className=" text-sm text-white ">⭐ {item.averageRating || ' No Rating'}</p></div>
                      <div className="free bg-green-500  px-2 flex items-center justify-center h-7"><p className="text-sm text-white font-semibold">Free</p></div>
                    </div>

                    <div className="image-div ">
                      <img className=" image " src={item.imageLinks.smallThumbnail} alt={item.title} />
                    </div>

                    <div className=" txt-box ">
                      <h3 className="mt-5 mb-2 font-bold text-sm">{item.title}</h3>
                      <p className="mt-1 mb-5 text-sm text-gray-600">{item.authors}</p></div>
                  </div>

                </div>
              ))}


            </div>
          )}




        </center>
      </div>



      <footer className='  bg-white h-100 p-6 '>
        <center>
          <p className='text-gray-500'>© 2024Copyright:<span className='text-black'> Kalvium</span></p>
        </center>
      </footer>


    </div>
  )
}

export default Books