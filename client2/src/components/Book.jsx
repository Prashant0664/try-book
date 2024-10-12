import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
const Book = () => {
    const navigate = useNavigate();
    const [bookchapters, setbookchapters] = useState([]);
    const [coverimg, setcoverimg] = useState("");
    const [views, setviews] = useState(1);
    const [title, settitle] = useState("");
    const [metadesc, setmetadesc] = useState("");
    const fetchbookchapters = async (id) => {
        try {
            const data = await axios.post(`${process.env.REACT_APP_URL}/getallbooks`,
                {
                    id: id
                });
            var arr = [];
            for (var i = 0; i < data.data.booknames.length; i++) {
                var s = data.data.booknames[i].split(" - ");
                arr.push({ name: data.data.booknames[i], link: data.data.booklinks[i], num: s[1] });
            }
            arr.sort(function (x, y) {
                if (Number(x.num) > Number(y.num)) {
                    return -1;
                }
                if (Number(x.num) < Number(y.num)) {
                    return 1;
                }
                return 0;
            });
            settitle(data.data.title);
            setcoverimg(data.data.img);
            setviews(data.data.views);
            // console.log(arr, "LLLLL");
            setbookchapters(arr);
            var s = "";
            // console.log(title);
            for (var i = 1; i <= 300; i++) {
                s += name + " " + i + ", ";
            }
            s += contenti;
            setmetadesc(s);
        } catch (error) {
            console.log(error);
        }
    }
    var contenti = "Manga, Comic, Online, Manag Reader, Latest Manga, Manhwa, Manwha, Japan, Web Development, Website, Scrapping, New, Trending Manga, Muse Asia, Latest, Newest, Funniest, MERN, MongoDB ExpessJS, ReactJs, NodeJs, Read Free, Children, #tags, old manga, anime, anime story, online anime, free anime, free manga, cartoon, online free anime, hidden anime, new anime, animes, muse asia anime, youtube anime, youtube cartoon";
    const { book, name } = useParams()
    React.useEffect(() => {
        fetchbookchapters(book);
    }, [])
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <link rel="icon" href={coverimg} />
                <meta charset="UTF-8" />
                <meta name="description" content={metadesc} />
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
                <div className='text-[20px]  font-semibold items-center text-center '>
                    Views: {views}
                </div>
            </div>
            <div className='w-[100%] min-w-[90vw] mx-[5vw] max-w-[90vw] flex justify-center items-center'>
                <img src={coverimg} className=' rounded-md' alt="cover" />
            </div>
            <div className='w-[100%] flex justify-center items-center'>
                <table className=' w-[80%] justify-center items-center flex border border-black py-1 pl-1 font-semibold cursor-pointer  '>
                    <tbody className='w-[100%] flex flex-col justify-center items-center'>
                        {bookchapters && bookchapters.map((b, index) => (
                            <tr className='bg-slate-200 px-3 cursor-pointer w-[100%] text-black border border-t-2 border-black py-2 justify-center' onClick={() => { navigate("/manga/"+title+"/" + b.link) }} key={index}>
                                <td className='max-w-10 min-w-10 bg-slate-200'>
                                    <div className='max-w-10 min-w-10 bg-slate-200'>
                                        {index + 1}.&nbsp;  &nbsp;
                                    </div>
                                </td>
                                <td className=''>
                                    <h1>{b.name}</h1>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Book