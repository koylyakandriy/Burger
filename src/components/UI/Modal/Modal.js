import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class Modal extends Component {
	state = {};

	shouldComponentUpdate(nextProps) {
		const { show } = this.props;
		return nextProps.show !== show;
	}

	componentWillUpdate() {
		console.log('componentWillUpdate - Modal');
	}

	render() {
		const { children, show, modalClosed } = this.props;
		return (
			<>
				<Backdrop show={show} clicked={modalClosed} />
				<div
					className={classes.Modal}
					style={{
						transform: show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: show ? '1' : '0',
					}}
				>
					{children}
				</div>
			</>
		);
	}
}

Modal.propTypes = {
	children: PropTypes.object.isRequired,
	show: PropTypes.bool.isRequired,
	modalClosed: PropTypes.func.isRequired,
};

export default Modal;
