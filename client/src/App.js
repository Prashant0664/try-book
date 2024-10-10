import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';
function App() {

  const [link, setlink] = useState("");
  const [newlink, setnewlink] = useState("");
  const [newtitle, setnewtitle] = useState("");
  const [metadata, setmetadata] = useState([]);
  const [bookchlink, setbookchlink] = useState("");
  const [show, setshow] = useState(false);
  const [showid, setshowid] = useState("");
  const [bookchapters, setbookchapters] = useState([]);
  const [chlinkpref, setchlinkpref] = React.useState("");
  const [chlinknum, setchlinknum] = React.useState("");
  const [chlinksuff, setchlinksuff] = React.useState("");
  const [chnumber, setchnumber] = React.useState(0);
  const [stnumber, setstnumber] = React.useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [allbooknames, setallbooknames] = useState([]);
  const [allimages, setallimages] = useState([]);
  const [showm, setshowm] = useState(false);
  const [currimglink, setcurrimglink] = useState("");
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);  // Capture the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert('Please select an image!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);  // Add the selected image to formData
    formData.append('id', showid);  // Add the selected image to formData
    // return;
    try {
      // Send image to backend
      const response = await axios.post(`${process.env.REACT_APP_URL}/uploadcoverimg`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Image uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  const getallimages = async (id) => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_URL}/getallimages`,
        {
          id: id
        }
      );
      console.log(data.data.data[0]);
      setallimages(data.data.data[0].pagesid);
    } catch (error) {
      console.log(error);
    }
  }
  const getallbooks = async () => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_URL}/getallbooks`,
        {
          id: showid
        }
      );
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const fetchmetadata = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_URL}/metadata`);
      setmetadata(data.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  const addlink = async () => {
    try {
      const data = await axios.post(`${process.env.REACT_APP_URL}/addmetadata`,
        {
          link: newlink,
          title: newtitle
        }

      );
    } catch (error) {
      console.log(error);
    }
  }
  const fetchbookchapters = async (id) => {
    try {
      console.log(id, "id");
      // const data = await axios.post(`${process.env.REACT_APP_URL}/fetchbookchapters',
      //   {
      //     id: id
      //   }
      // );
      const data = await axios.post(`${process.env.REACT_APP_URL}/getallbooks`,
        {
          id: id
        });
      var arr = [];
      for (var i = 0; i < data.data.booknames.length; i++) {
        arr.push({ name: data.data.booknames[i], link: data.data.booklinks[i] });
      }
      arr.sort(function(x, y) {
        if (x.name > y.name) {
          return -1;
        }
        if (x.name < y.name) {
          return 1;
        }
        return 0;
      });
      console.log(arr,"LLLLL");
      setbookchapters(arr);
    } catch (error) {
      console.log(error);
    }
  }
  const addchaptergrp = async () => {
    for(var i=Number(stnumber);i<=Number(chnumber);i++){
      try {
        const data=await axios.post(`${process.env.REACT_APP_URL}/addchapterone`,
        {
          id: showid,
          urlpre: chlinkpref,
          urlnum: i,
          urlsuff: chlinksuff,
          number: i
        }
        );
      } catch (error) {
        console.log(error);
      }
    }
    console.log("SUCCESSFULLY LOADED CHAPTER");
    return;
    try {
      
      const data = await axios.post(`${process.env.REACT_APP_URL}/addchaptergrp`,
        {
          id: showid,
          urlpre: chlinkpref,
          urlnum: chlinknum,
          urlsuff: chlinksuff,
          stnumber:stnumber,
          number: chnumber
        }
      );
      console.log("SUCCESSFULLY LOADED CHAPTER");
    } catch (error) {
      console.log(error);
    }
  }
  const addchapterone = async () => {
    try {
      console.log(chlinknum, chlinkpref, chlinksuff);
      const data = await axios.post(`${process.env.REACT_APP_URL}/addchapterone`,
        {
          id: showid,
          urlpre: chlinkpref,
          urlnum: chlinknum,
          urlsuff: chlinksuff,
          number: chnumber
        }
      );
      console.log("SUCCESSFULLY LOADED CHAPTER");
    } catch (error) {
      console.log(error);
    }
  }
  React.useEffect(() => {
    fetchmetadata();
  }, [])
  return (
    <div className="">
      {/* <form>
        <input
          type="text"
          value={link}
          className='border-solid border-2 border-gray-300'
          onChange={(e) => setlink(e.target.value)}
          placeholder="Enter the link"
        />
      </form>
      <div className='border-solid border-2 w-[fit-content] cursor-pointer '>
        Submit
      </div> */}
      <br />
      <hr />
      <div className=''>
        <form>
          <input
            type="text"
            value={newlink}
            className='border-solid border-2 border-gray-300'
            onChange={(e) => setnewlink(e.target.value)}
            placeholder="Enter the new link"
          />
        </form>
        <form>
          <input
            type="text"
            value={newtitle}
            className='border-solid border-2 border-gray-300'
            onChange={(e) => setnewtitle(e.target.value)}
            placeholder="Enter the new title"
          />
        </form>

        <div onClick={() => {
          addlink();
        }} className='w-[fit-content] border-solid border-2 border-gray-300'>
          ADD+
        </div>
        <br />
        <br />
        <div className='items-center justify-center flex flex-wrap gap-4 mx-2 cursor-pointer'>

          {metadata.map((m) => (
            <div className='flex flex-col justify-center items-center'>
              <div className='max-h-28 max-w-28 overflow-hidden'>
                <img src={m.coverimg} className='h-[fit-content]' alt="" />
              </div>
              <h1
                onClick={() => {
                  setshow(!show);
                  setshowid(m._id);
                  fetchbookchapters(m._id);
                  // addbookchapter(m._id);
                  console.log(showid);
                }}
                className='h-[70px] w-28 text-center overflow-scroll px-1 py-1 font-semibold bg-red-300'
              >{m.title}</h1>

            </div>
          ))}
        </div>
        <br />
        <br />
      </div>
      <div className='mx-2 px-2 py-2 border-black border-solid border bg-slate-200'>

        {
          show && <>
            <form className='flex justify-evenly flex-wrap'>
              <input
                type="text"
                value={chlinkpref}
                className='border-solid border-2 border-gray-300'
                onChange={(e) => setchlinkpref(e.target.value)}
                placeholder="Enter the pref link"
              />
              <input
                type="text"
                value={chlinknum}
                className='border-solid border-2 border-gray-300'
                onChange={(e) => setchlinknum(e.target.value)}
                placeholder="Enter the mid link"
              />
              <input
                type="text"
                value={chlinksuff}
                className='border-solid border-2 border-gray-300'
                onChange={(e) => setchlinksuff(e.target.value)}
                placeholder="Enter the suff link"
              />
              <input
                type="text"
                value={stnumber}
                className='border-solid border-2 border-gray-300'
                onChange={(e) => setstnumber(e.target.value)}
                placeholder="Enter the st-number(for grp)"
              />
              <input
                type="text"
                value={chnumber}
                className='border-solid border-2 border-gray-300'
                onChange={(e) => setchnumber(e.target.value)}
                placeholder="Enter the ch-number"
              />
            </form>
            <div className='flex justify-evenly mt-2'>

              <div className='border border-black p-2 rounded-xl cursor-pointer hover:bg-white' onClick={() => addchapterone()}>
                Add one chapter only
              </div>
              <div className='border border-black p-2 rounded-xl cursor-pointer hover:bg-white' onClick={() => addchaptergrp()}>
                Add Group
              </div>
            </div>
            <br />
            <form onSubmit={handleSubmit} className='flex flex-wrap justify-evenly'>
              <input type="file" onChange={handleFileChange} accept="image/*" />
              <button type="submit" className='border border-black p-1 rounded-xl cursor-pointer hover:bg-white'>Upload Image</button>
            </form>
            <br />
            <div className=''>

              {bookchapters && bookchapters.map((b, index) => (
                <div className='' key={index}>
                  <table className='flex border border-black py-1 pl-1 font-semibold cursor-pointer   '>
                    <tbody>
                      <tr className='' onClick={() => {setshowm(!showm); setcurrimglink(b.link);getallimages(b.link)}}>
                        <td className=''>
                          {index + 1}.&nbsp;  &nbsp;
                        </td>
                        <td className=''>
                          <h1>{b.name}</h1>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  {showm && allimages && b.link==currimglink && allimages.map((a, ind) => (
                    <div className='' key={ind}>
                      <img src={a} alt="" />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </>
        }


      </div>
    </div>

  );
}

export default App;
