import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from "react-helmet";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
const Manga = () => {
    const navigate = useNavigate();
    const [allimages, setallimages] = useState([]);
    const [title, settitle] = useState("");
    const [coverimg, setcoverimg] = useState("");
    const [views, setviews] = useState("");
    const { manga, name } = useParams()
    var contenti = "Manga, Comic, Online, Manag Reader, Latest Manga, Manhwa, Manwha, Japan, Web Development, Website, Scrapping, New, Trending Manga, Muse Asia, Latest, Newest, Funniest, MERN, MongoDB ExpessJS, ReactJs, NodeJs, Read Free, Children, #tags, old manga, anime, anime story, online anime, free anime, free manga, cartoon, online free anime, hidden anime, new anime, animes, muse asia anime, youtube anime, youtube cartoon";
    const [metadesc, setmetadesc] = useState("");

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
            var s = "";
            s += name + ",  ";
            s += name + ", ";
            s += name + ", ";
            s += name + ", ";
            s += name + ", ";
            s += contenti;
            setmetadesc(s);
        } catch (error) {
            console.log(error);
        }
    }
    React.useEffect(() => {
        if(allimages.length===0){
            getallimages(manga)
        }
        // console.log(metadesc);
    }, [metadesc])
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={coverimg} />
                <meta charset="UTF-8" />
                <meta name="description" content={metadesc}  data-rh="true" />
                <meta name="keywords" content={metadesc} />
                <meta name="author" content="Prashant" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Helmet>

            <div className='border-0 border-b-2 border-slate-400 shadow-blue-500 shadow-md h-[4rem] flex justify-between px-10'>
                <div className=' cursor-pointer' onClick={() => { navigate("/") }}>
                    <img src={coverimg} className='h-[3.8rem] py-[0.2rem] rounded-md' alt="cover" />
                </div>
                {/* Navbar Home button */}
                <div className='flex justify-center items-center mt-2'>
                    <div className='bg-blue-500 cursor-pointer hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={() => { navigate("/") }}>
                        Home
                    </div>
                </div>
            </div>
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
                <div className='mx-auto flex flex-col justify-center items-center' key={ind}>
                    <img src={a} alt="" />
                </div>
            ))}
        </>
    )
}

export default Manga