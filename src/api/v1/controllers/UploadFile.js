const uploadImage = async (req, res) => {
    console.log(req.body)
    try {
        upload.single('image'), function(req, res){
            console.log(req.file, req.body)
        }
        res.send(200)
    } catch (error) {
        res.send(error)
    }
}


module.exports = { uploadImage };