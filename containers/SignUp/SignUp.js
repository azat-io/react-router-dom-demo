import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { connect } from 'react-redux'
import {
  Field,
  reduxForm,
} from 'redux-form'
import {
  compose,
  withHandlers,
} from 'recompose'

import get from 'lodash/get'

import Title from 'components/Title'
import Input from 'components/Input'
import Button from 'components/Button'

import {
  required,
  email,
  password,
} from 'etc/validation'

import SIGN_UP from './sign-up.gql'

const SignUp = ({ handleSubmit, submitting, valid }) => (
  <Mutation mutation={gql`${SIGN_UP}`}>
    {
      (signUp, { data }) => (
        <form onSubmit={(event) => handleSubmit(event, signUp)}>
          <Title name={'Регистрация'} />
          <Field
            name={'email'}
            placeholder={'Email'}
            type={'text'}
            component={Input}
            validate={[required, email]}
          />
          <Field
            name={'password'}
            placeholder={'Пароль'}
            type={'password'}
            component={Input}
            validate={[required, password]}
          />
          <Button
            type={'submit'}
            disabled={submitting || !valid}
          >
            { 'Зарегистрироваться' }
          </Button>
        </form>
      )
    }
  </Mutation>
)

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
  valid: PropTypes.bool.isRequired,
}

export default compose(
  reduxForm({
    form: 'signUpForm',
  }),
  connect(({ form: { signUpForm } }) => ({
    email: get(signUpForm, 'values.email'),
    password: get(signUpForm, 'values.password'),
  }), null, null, {
    pure: false,
  }),
  withHandlers({
    handleSubmit: ({ email, password, reset }) => async (event, signUp) => {
      event.preventDefault()
      try {
        const signUpUser = await signUp({
          variables: {
            email,
            password,
          },
        })
        const { token } = get(signUpUser, 'data.signUp')
        localStorage.setItem('TOKEN', token)
        reset()
      } catch (error) {
        console.log('Error:', error)
      }
    },
  }),
)(SignUp)
