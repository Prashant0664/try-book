import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { useNavigate } from "react-router-dom";
const Book = () => {
    const navigate = useNavigate();
    const [bookchapters, setbookchapters] = useState([]);
    const [coverimg, setcoverimg] = useState("");
    const [title, settitle] = useState("");
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
            console.log(arr, "LLLLL");
            setbookchapters(arr);
        } catch (error) {
            console.log(error);
        }
    }
    const { book } = useParams()
    React.useEffect(() => {
        fetchbookchapters(book);
    }, [])
    return (
        <>
            <div className='text-[50px] font-semibold items-center text-center '>
                {title}
            </div>
            <div className='w-[100%] flex justify-center items-center'>
                <img src={coverimg} className=' h-[90vh] rounded-md' alt="cover" />
            </div>
            <div className='w-[100%] flex justify-center items-center'>
                <table className=' w-[80%] justify-center items-center flex border border-black py-1 pl-1 font-semibold cursor-pointer  '>
                    <tbody className='w-[100%] flex flex-col justify-center items-center'>
                        {bookchapters && bookchapters.map((b, index) => (
                            <tr className='bg-slate-200 px-3 cursor-pointer w-[100%] text-black border border-t-2 border-black py-2 justify-center' onClick={() => { navigate("/manga/"+b.link+"/"+book) }} key={index}>
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