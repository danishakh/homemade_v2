import React, { Component } from "react";
import Modal from "react-modal";

class DishModal extends Component{

	

	afterOpenModal() {
		this.subtitle.style.color="#f00";
	}

	render() {

		if (!this.props.show) {
			return null;
		}

		return (
			<Modal
				isOpen={props.showModal}
				onAfterOpen={this.afterOpenModal}
			>

			</Modal>
		)
	}
}

		

export default DishModal;

//<div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
			//   <div className="modal-dialog modal-dialog-centered" role="document">
			//     <div className="modal-content">
			//       <div className="modal-header">
			//         <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
			//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
			//           <span aria-hidden="true">&times;</span>
			//         </button>
			//       </div>
			//       <div className="modal-body">
			//         some form here...
			//       </div>
			//       <div className="modal-footer">
			//         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
			//         <button type="button" className="btn btn-primary">Save changes</button>
			//       </div>
			//     </div>
			//   </div>
			// </div>