import superagent from "superagent";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./ImageUploadZone.css";
import sha1 from "sha1";
const keys =  require("../../utils/keys.js");


class ImageUploadZone extends Component {

	state = {
		images: [],
		dropzoneStyle: {
			width:"500px",
			height:"50px"
		}
	}

	uploadFile(file) {
		console.log('upload fired!');

		const image = file[0];
		const timestamp = Date.now()/1000;
		const paramStr = "timestamp="+timestamp+"&upload_preset="+keys.cloudinary.uploadPreset+keys.cloudinary.apiSecret;
		//encrypt our parameters
		const signature = sha1(paramStr);

		const params = {
			"api_key": keys.cloudinary.apiKey,
			"timestamp": timestamp,
			"upload_preset": keys.cloudinary.uploadPreset,
			"signature": signature
		}

		let uploadRequest = superagent.post(keys.cloudinary.uploadURL);
		uploadRequest.attach("file", image);

		Object.keys(params).forEach(key => {
			uploadRequest.field(key, params[key])
		});

		uploadRequest.end((err, res) => {
			if (err) {
				console.log(err);
				return
			}

			console.log("Upload Complete: ", JSON.stringify(res.body));
			let updatedImages = Object.assign([], this.state.images);
			updatedImages.push(res.body.secure_url);

			this.setState({
				images: updatedImages
			});

		});


	}



	render() {

		return(
			<div className="image-dropzone">
				<Dropzone onDrop={this.uploadFile} />
			</div>
		)
	}
}

export default ImageUploadZone;