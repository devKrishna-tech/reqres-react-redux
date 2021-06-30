import React, {Fragment} from 'react';
import {ErrorMessage, Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Header} from "semantic-ui-react";
import {connect} from 'react-redux';
import * as authActions from '../../../actions/auth';
import Spinner from "../../../components/UI/Spinner/Spinner";
import {withRouter} from 'react-router-dom';

const SignUp = (props) => {
    const validationSchema = () => {
        return Yup.object({
            email: Yup.string().email('Invalid email address').required('Required'),
            firstName: Yup.string().max(15, 'Must be 15 characters or less').required('Required'),
            lastName: Yup.string().max(20, 'Must be 20 characters or less').required('Required'),
            password: Yup.string().required('Required').min(6, 'Must be 6 characters at least'),
        })
    }

    const onChangeAuthMode = () => {
        props.history.push('/auth/signin');
    }

    return (
        <Fragment>
            <br/>
            {props.submittingForm ? <Spinner/> :
                <Formik
                    initialValues={{
                        email: 'eve.holt@reqres.in',
                        firstName: 'Mareena',
                        lastName: 'Nazir',
                        password: 'pistol'
                    }}
                    validationSchema={validationSchema()}
                    onSubmit={(values) => {
                        props.doAuth({
                            ...values,
                            avatar: 'https://react.semantic-ui.com/images/avatar/large/molly.png',
                            isSignUp: true,
                        });
                    }}
                >
                    <Form className="ui form container">
                        <Header as="h2" color="blue">
                            Signup
                        </Header>
                        <div className='field'>
                            <label htmlFor="email">Email Address</label>
                            <Field className="field" name="email" type="email"/>
                            <ErrorMessage name="email">
                                {msg => <div style={{color: 'red', fontWeight: 'bold'}}>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className='field'>
                            <label htmlFor="firstName">First Name</label>
                            <Field className="field" name="firstName" type="text"/>
                            <ErrorMessage name="firstName">
                                {msg => <div style={{color: 'red', fontWeight: 'bold'}}>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className='field'>
                            <label htmlFor="lastName">Last Name</label>
                            <Field className="field" name="lastName" type="text"/>
                            <ErrorMessage name="lastName">
                                {msg => <div style={{color: 'red', fontWeight: 'bold'}}>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className='field'>
                            <label htmlFor="password">Password</label>
                            <Field className="field" name="password" type="password"/>
                            <ErrorMessage name="password">
                                {msg => <div style={{color: 'red', fontWeight: 'bold'}}>{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <br/>
                        <div className='field'>
                            <button className="ui button" type="submit">Sign Up</button>
                        </div>
                        <button className="ui button" type="button" onClick={onChangeAuthMode}>
                            Switch to Sign In
                        </button>
                    </Form>
                </Formik>}
            <br/>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        submittingForm: state.auth.loading,
    }
}

const mapDispatchToProps = (dispatch) => ({
    doAuth: (authData) => dispatch(authActions.authUser(authData)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
