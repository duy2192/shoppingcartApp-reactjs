import cloudinary from 'config/cloudinary';
import { failed, log, success } from 'utils';
const mimeImage = ['image/gif', 'image/jpeg', 'image/png', 'image/svg+xml'];
export const uploadController = {
  async uploadImage(req, res) {
    try {
      const { file } = req.files;
      if (!mimeImage.includes(file?.mimetype)) {
        return failed(res, 'File không đúng định dạng ảnh !');
      }
      const result = await cloudinary.v2.uploader.upload(file.tempFilePath);
      success(res, result.url);
    } catch (e) {
      log.error(e);
      failed(res, e.message);
    }
  },
};
