import cloudinary from '../config/cloudinary.js'

// single: "file"
// multiple: ["file","file"...]

export const uploadSingle=async(req,res)=>{
    try {
        const result=await cloudinary.uploader.upload(req.file.path,{format:'avif'})
        res.status(200).json({ url: result.secure_url })
    } catch (error) {
        res.status(400).json(error)
    }
}

export const uploadMultiple=async(req,res)=>{
    try {
        const url=[]
        for(const i of req.files){
            const result=await cloudinary.uploader.upload(i.path,{format:'avif'})
            url.push(result.secure_url)
        }
        res.status(200).json(url);
    } catch (error) {
        res.status(400).json(error)
    }
}