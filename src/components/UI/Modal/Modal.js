import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop/Backdrop';

import classes from './Modal.css';

class Modal extends Component {
	state = {};

	shouldComponentUpdate(nextProps) {
		const { show, children } = this.props;
		return nextProps.show !== show || nextProps.children !== children;
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
	children: PropTypes.object,
	show: PropTypes.bool,
	modalClosed: PropTypes.func,
};

Modal.defaultProps = {
	children: {},
	modalClosed: '',
	show: '',
};

export default Modal;
