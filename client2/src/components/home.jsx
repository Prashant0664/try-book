import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
const Home = () => {
    const [search, setSearch] = useState('')
    const [metadata, setmetadata] = useState([]);
    const fetchmetadata = async () => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_URL}/metadata`);
            setmetadata(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        fetchmetadata();
    }, [])
    return (
        <>
            <div className='flex justify-center mt-2 font-bold items-center'>
                <div className='text-[30px]'>
                    Read Your Favourite Manga Here for Free!!!
                </div>
            </div>
            <form className='flex justify-center'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Manga Here...'
                    className='w-[80%] justify-center flex items-center md:w-[50%] lg:w-[30%] mt-4 p-2 border-2 border-gray-300 rounded-md'
                />
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 mt-4'>Search</button>
            </form>
            <br />
            <div className='flex justify-center mt-2 font-bold items-center'>
                <div className=''>
                    {metadata && metadata.map((item, index) => (
                        <div className='' key={index}>
                            <div className=' w-48 h-60 shadow-sm cursor-pointer hover:shadow-lg hover:shadow-blue-200 rounded-xl flex flex-col items-center shadow-blue-300'>
                                <div className=' w-40 h-40 shadow-sm shadow-blue-300 rounded-xl'>
                                    <img src={item.coverimg} className='rounded-xl' alt={item.title} />
                                </div>
                                <div className='pt-2 max-h-20 overflow-scroll text-center'>
                                {item.title}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home