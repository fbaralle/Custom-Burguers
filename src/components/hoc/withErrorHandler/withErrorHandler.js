import React, {Component} from "react";
import Modal from "../../UI/Modal/Modal";
import Aux from "../Aux/Aux";

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
        //calls the check-error interceptors before the child components are rendered
        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error: error});
            });
        };
        // when components are unmounted, it destroys the interceptors. This way it
        // improves performance destroying interceptors that are not needed anymore
        componentWillUnmount () {
            // remove interceptors method
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({error: null});
        };

        render () {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        close={this.errorConfirmHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        };
    };
};

export default withErrorHandler;