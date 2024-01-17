import { Link, useNavigate } from "react-router-dom"
import navBack from './assets/left-chevron.png'

function BookDetail(props) {
    const { darkmode, setDarkMode, details, closeDetails } = props;

    const bgStyle = darkmode ? { background: "rgb(18, 72, 112)" } : {};
    const navigate = useNavigate()


    return (
        <div className=" " style={bgStyle}>


            <div className='box bg-white  flex flex-col items-center justify-center rounded'>
                
                <div onClick={closeDetails} className="to-back flex justify-between items-center hover:opacity-85" >
                    <img className="h-6 " src={navBack} alt="" />
                    <button onClick={closeDetails} className='nav-to-back text-red-500 text-lg font-semibold'>
                        Back to Home
                    </button>
                </div>

                <div className=' h-80 flex justify-center items-center mt-4'>

                    <img
                        src={details.book.imageLinks.thumbnail}
                        alt={details.book.title}
                        className='image2 h-72 w-52 rounded-md ' />

                    <div className='book-details border overflow-hidden flex flex-col justify-center ml-10 text-left bg-white bg-opacity-80 shadow-lg p-8 rounded-md'>
                        <div className="flex justify-between">
                            <h1 className=' font-semibold text-2xl text-gray-800 mb-4'>
                                {details.book.title}
                            </h1>

                            <div className="free bg-green-500  px-3 flex items-center justify-center h-7"><p className="text-sm text-white font-semibold">Free</p></div>


                        </div>

                        <h1>Category: {details.book.categories}</h1>
                        <p className='text-m'>Subtitle: {details.book.subtitle || 'N/A'}</p>
                        <p className='text-lg text-gray-700 mt-2'>Author: {details.book.authors.join(', ')}</p>

                        <div className='justify-center items-center font-semibold'>Rating:⭐ {details.book.averageRating || 'Not rated yet'}</div>

                        <div className='overflow-y-auto max-h-36 mt-4'>
                            <p className='text-sm'>{details.book.description}</p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default BookDetail;
