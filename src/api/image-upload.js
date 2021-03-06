import uuid from "uuid";
import path from "path";

const uuidv4 = uuid.v4;

export default function uploadImage(req, res) {
  // if (!req.isAuthenticated()) {
  //   return res
  //     .status(401)
  //     .json({
  //       status: "error",
  //       details: "you need to be logged in to use this route"
  //     });
  // }

  try {
    if (!req.files) {
      res.send({
        status: false,
        message: "No file uploaded"
      });
    } else {
      //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
      const image = req.files[0];
      const extension = path.extname(image.name);
      const newName = uuidv4() + extension;
      //Use the mv() method to place the file in upload directory (i.e. "uploads")
      image.mv("./public/images/" + newName);

      //send response
      res.send({
        status: true,
        message: "File is uploaded",
        data: {
          name: newName,
          mimetype: image.mimetype,
          size: image.size
        }
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}
