import superagent from "superagent";
import React, { Component } from "react";
import Dropzone from "react-dropzone";
import "./ImageUploadZone.css";
import sha1 from "sha1";
const keys =  require("../../utils/keys.js");


class ImageUploadZone extends Component {

	constructor(){
		super();
		this.state = {
			images: [],
			dropzoneStyle: {
				width:"500px",
				height:"50px"
			}
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

			
			const uploaded = res.body;

			let updatedImages = Object.assign([], this.state.images);
			updatedImages.push(uploaded);
			
			//console.log(res.body.secure_url);
			
			this.setState({
				images: updatedImages
			})

			console.log("Upload Complete: ", JSON.stringify(res.body));


			//props.callbackFromParent(res.body.secure_url);
		});


	}

	// handleDataToParent = () => {
	// 	let data = this.state.imageURL;
	// 	this.props.callbackFromParent(data);
	// }

	render() {

		return(
			
		)
	}
}

export default ImageUploadZone;