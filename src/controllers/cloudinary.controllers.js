import { v2 as cloudinary } from 'cloudinary';
import { unlink, access } from 'fs/promises'; // Promises-based file operations

// Configure Cloudinary
cloudinary.config({
    cloud_name: "di6djwjxb",
    api_key: 662357873381765,
    api_secret: "GTIJD3fNTP5WjRdRCrRvdO_Bnjs",
});

// Upload Function
const uploadFileCloudinary = async (filepath) => {
    if (!filepath) return null;

    try {
        // Ensure file exists
        await access(filepath);

        // Upload to Cloudinary
        const response = await cloudinary.uploader.upload(filepath, {
            resource_type: "auto",
        });

        // Delete local file
        await unlink(filepath);

        console.log("The file is uploaded to the Cloudinary server:", response);
        return response;
    } catch (error) {
        // Clean up and log errors
        try {
            await unlink(filepath);
        } catch {
            console.error("Error deleting local file:", filepath);
        }
        console.error("Error during Cloudinary upload:", error.message);
        return { success: false, error: error.message }; // Return structured error
    }
};

export { uploadFileCloudinary };