import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
const Manga = () => {
    const [allimages, setallimages] = useState([]);
    const [title, settitle] = useState("");
    const [coverimg, setcoverimg] = useState("");
    const [views, setviews] = useState("");
    const { manga, book } = useParams()
    const getallimages = async (id) => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_URL}/getallimages`,
                {
                    id: id
                }
            );
            settitle(data.data.data[0].title);
            setcoverimg(data.data.data[0].coverimg);
            setviews(data.data.data[0].views);
            setallimages(data.data.data[0].pagesid);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        getallimages(manga)
    }, [])
    return (
        <>
            <div className='text-[50px] font-semibold items-center text-center '>
                {title}
            </div>
            <div className=''>
                <div className='text-[20px] font-semibold items-center text-center '>
                    Views: {views}
                </div>
            </div>
            <div className='w-[100%] flex justify-center items-center'>
                <img src={coverimg} className=' h-[90vh] rounded-md' alt="cover" />
            </div>
            {allimages && allimages.map((a, ind) => (
                <div className='' key={ind}>
                    <img src={a} alt="" />
                </div>
            ))}
        </>
    )
}

export default Manga