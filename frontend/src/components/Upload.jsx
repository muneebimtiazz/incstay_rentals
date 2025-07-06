import { useState } from "react"

const Upload = ({selectedImages}) => {
    const [emp, setEmp] = useState([])

    const creatingDisplay=(e)=>{
        const arr=(Array.from(e.target.files))
        const previews=arr.map((item)=>URL.createObjectURL(item))
        setEmp(prev=>[...prev,...previews])
        selectedImages(arr)
        // const str=(arr[0].name).toString()
        // console.log(str)
    }

  return (
        <div>

        <div className='text-center '>
            <p className='text-xl'>Photos</p>
            <p className='text-xs text-gray-700'>Add photos of your place</p>
        </div>
        <div>
            <p>Upload images</p>
            <p className='text-justify text-xs'>Upload clear, high-quality images.</p>
        </div>
        <input type="file" onChange={creatingDisplay} multiple />
        <div className="flex justify-center items-center w-full py-10 gap-3 flex-wrap">
            {emp.map((item)=>{
                return <img className="w-32 h-32 object-cover rounded" src={item}/>
            })}
        </div>

        </div>
  )
}

export default Upload