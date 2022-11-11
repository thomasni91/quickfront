import api from '../services/api';
import { UPLOAD_USER_AVATAR, GET_USER_AVATAR } from './endPoints';

export const getUserAvatar = (userId) =>
	api.get(`${GET_USER_AVATAR}/${userId}`);

export const uploadUserAvatar = async (data) => {
	const { avatarImage, username, userId } = data;
	const avatarFile = new File([avatarImage], username);
	const imageFormData = new FormData();
	imageFormData.append('userAvatar', avatarFile);
	imageFormData.append('userId', userId);

	await api({
		method: 'post',
		url: UPLOAD_USER_AVATAR,
		data: imageFormData,
		headers: { 'Content-Type': 'multipart/form-data' },
	});
	// get image presigned url
	const result = await getUserAvatar(userId);
	const { avatarUrl } = result.data;
	return avatarUrl;
};
