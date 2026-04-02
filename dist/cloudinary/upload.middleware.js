// cloudinary/upload.middleware.ts
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";
const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "foodhub/providers",
            public_id: Date.now() + "-" + file.originalname,
        };
    },
});
export const upload = multer({ storage });
//# sourceMappingURL=upload.middleware.js.map