import axios, { Axios } from 'axios';
import fileDownload from 'js-file-download';
import React, { useState } from 'react'
import { FileUploader } from 'react-drag-drop-files';

function Main() {

    const fileTypes = ["ZIP"];

    const UPLOAD_ENDPOINT = "https://melusi.pythonanywhere.com/api/make_pdf"

    const [file, setFile] = useState(null);
    const [saveFile, setsaveFile] = useState(false)
    const handleChange = (file) => {
        setFile(file)
        console.log(file)
    }

    const handleSubmit = async () => {
        const fData = new FormData()
        fData.append("scans", file)
        const resp = await axios.post(UPLOAD_ENDPOINT, fData,
            {
                headers: {
                    "content-type": "multipart/form-data",
                },
            }
        )
        console.log(resp)
        console.log(saveFile)
        setsaveFile(true)

    }

    const handleDownload = async () => {
        await axios(
            {
                url: 'https://melusi.pythonanywhere.com/api/make_pdf',
                method: 'GET',
                responseType: 'blob'
            }).then(
            response =>{const url = window.URL.createObjectURL(new Blob([response.data]));
			const link = document.createElement("a");
			link.href = url;
			link.setAttribute("download", "pdf_makr.pdf");
			document.body.appendChild(link);
			link.click();}
            )
        window.location.reload(true)

    }

    return (
        <div className='py-2 px-4 flex h-full items-center gap-8'>
            <div className='my-10 flex-1'>
                <h1 className='text-5xl text-white'>Scan & Save Documents Instantly - Convert Your JPG Scans to PDF with Ease!</h1>
                <h4 className='text-gray-300'>Create Professional PDFs with Ease - Try Our PDF Makr Now!</h4>
            </div>
            <div className='flex-1'>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
                {file ? <h3 className='text-sm mt-4'>Uploaded File: {file.name}</h3> : <h3>No file uploaded</h3>}
                {file ? <div className="flex"> <button className='bg-blue-400 px-4 py-2 mt-4 rounded-full hover:bg-blue-900' onClick={handleSubmit}>Submit</button>
                    <button className='bg-blue-400 px-4 py-2 mt-4 rounded-full hover:bg-blue-900' onClick={handleDownload}>Download</button></div> : ""}
            </div>
        </div>
    )
}

export default Main