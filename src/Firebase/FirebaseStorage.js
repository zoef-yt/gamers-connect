import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
const storage = getStorage();

const uploadImageGetUrl = async (file, path) => {
	try {
		const storageRef = ref(storage, path);
		await uploadBytes(storageRef, file);
		const url = await getDownloadURL(storageRef);
		return url;
	} catch (error) {
		console.log(error);
		return null;
	}
};

export { uploadImageGetUrl };
