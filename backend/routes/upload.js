import express from 'express'
import { uploadSingle , uploadMultiple} from '../controllers/uploadControllers.js'
const router = express.Router()
import upload from '../middlewares/multer.js'

router.post('/upload/single',upload.single('image'),uploadSingle)
router.post('/upload/multiple',upload.array('images', 10),uploadMultiple);


export default router
