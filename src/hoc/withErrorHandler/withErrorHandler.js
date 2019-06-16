import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
	// eslint-disable-next-line react/display-name
	return class extends Component {
		state = { error: null };

		componentWillMount() {
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			});
			this.resInterceptor = axios.interceptors.response.use(
				res => res,
				error => {
					this.setState({ error });
				},
			);
		}

		componentWillUnmount() {
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.resInterceptor);
		}

		errorConfirmedError = () => {
			this.setState({ error: null });
		};

		render() {
			const { error } = this.state;
			return (
				<>
					<Modal show={error} modalClosed={this.errorConfirmedError}>
						{error ? error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			);
		}
	};
};

export default WithErrorHandler;
