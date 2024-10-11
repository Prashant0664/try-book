import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
// const Navivate
import { useNavigate } from "react-router-dom";
import IMG from "../nfavicon.png"
const Home = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState('')
    const [metadata, setmetadata] = useState([]);
    const fetchmetadata = async () => {
        try {
            const data = await axios.get(`${process.env.REACT_APP_URL}/metadata`);
            setmetadata(data.data.data);
            // console.log(data.data.data);
        } catch (error) {
            console.log(error);
        }
    }
    const handlesearch = (val) => {
        if (val === '') {
            fetchmetadata();
        } else {
            const newmetadata = metadata.filter((item) => item.title.toLowerCase().includes(val.toLowerCase()));
            setmetadata(newmetadata
            );
        }
    }
    React.useEffect(() => {
        fetchmetadata();
    }, [])
    return (
        <>
        <div className='border-0 border-b-2 border-slate-400 shadow-blue-500 shadow-md h-[4rem] flex justify-between px-10'>
                <div className=' cursor-pointer' onClick={() => { navigate("/") }}>
                    <img src={IMG} className='h-[3.8rem] py-[0.2rem] rounded-md' alt="cover" />
                </div>
                {/* Navbar Home button */}
                <div className='flex justify-center items-center mt-2'>
                    <div className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { navigate("/") }}>
                        Home
                    </div>
                </div>
            </div>
            <div className='flex justify-center mt-2 font-bold items-center'>
                <div className='text-[30px]'>
                    Read Your Favourite Manga Here for Free!!!
                </div>
            </div>
            <form className='flex justify-center'>
                <input
                    type='text'
                    value={search}
                    onChange={(e) => {setSearch(e.target.value);handlesearch(e.target.value);}}
                    placeholder='Search Manga Here...'
                    className='text-black w-[80%] justify-center flex items-center md:w-[50%] lg:w-[30%] mt-4 p-2 border-2 border-gray-300 rounded-md'
                />
                <div className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2 mt-4'>Search</div>
            </form>
            <br />
            <div className='flex justify-center mt-2 font-bold items-center'>
                <div className='flex gap-4 flex-wrap'>
                    {metadata && metadata.map((item, index) => (
                        <div className='' key={index} onClick={()=>{navigate("/book/"+item._id)}}>
                            <div className=' w-48 h-60 shadow-sm cursor-pointer hover:shadow-lg hover:shadow-blue-200 rounded-xl flex flex-col items-center shadow-blue-300'>
                                <div className=' w-40 h-40 shadow-sm shadow-blue-300 rounded-xl overflow-scroll'>
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