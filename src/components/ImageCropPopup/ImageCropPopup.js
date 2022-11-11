import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { useDispatch } from 'react-redux';
import { loadNotification } from '../../features/notification/notificationSlice';
import { getCroppedImg } from './CanvasUtils';
import classes from './ImageCropPopup.module.scss';

export default function ImageCropPopup({ imageUrl, setImage, closeModel }) {
	const [imageSrc, setImageSrc] = useState(imageUrl);
	const [crop, setCrop] = useState({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
	const dispatch = useDispatch();

	const onCropComplete = useCallback((croppedArea, newCroppedAreaPixels) => {
		setCroppedAreaPixels(newCroppedAreaPixels);
	}, []);

	const showCroppedImage = useCallback(async () => {
		try {
			const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
			setImageSrc(URL.createObjectURL(croppedImage));
			setImage(croppedImage);
			closeModel();
		} catch (e) {
			dispatch(
				loadNotification({
					message: e,
					type: 'error',
					visible: true,
				}),
			);
		}
	}, [imageSrc, croppedAreaPixels]);

	return (
		imageSrc && (
			<>
				<div className={classes.cropContainer}>
					<Cropper
						image={imageSrc}
						crop={crop}
						zoom={zoom}
						aspect={4 / 3}
						onCropChange={setCrop}
						onCropComplete={onCropComplete}
						onZoomChange={setZoom}
					/>
				</div>
				<div className={classes.controls}>
					<div className={classes.sliderContainer}>
						<Typography
							variant="overline"
							classes={{ root: classes.sliderLabel }}
						>
							Zoom
						</Typography>
						<Slider
							value={zoom}
							min={1}
							max={3}
							step={0.1}
							aria-labelledby="Zoom"
							sx={{
								'& .MuiSlider-root': {
									color: '#383838',
								},
							}}
							onChange={(e, zoomValue) => setZoom(zoomValue)}
						/>
					</div>
					<div className={classes.btnGroup}>
						<button type="button" onClick={showCroppedImage}>
							Confrim
						</button>
						<button type="button" onClick={closeModel}>
							Cancel
						</button>
					</div>
				</div>
			</>
		)
	);
}
