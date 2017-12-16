import React, { Component } from 'react';
import { ThemeProvider } from 'emotion-theming';
import fetch from 'isomorphic-fetch';
import Message from 'components/Form/Message';
import theme from 'styles/theme';
import { TOKEN_KEY } from 'utils/constants';
import { PageWrapper, Content, Title, Form, Label, Input, Button } from './styled';

/* eslint-disable react/prop-types */

export default class Login extends Component {
  state = {
    error: '',
  };

  submitForm = e => {
    e.preventDefault();

    this.form.blur();

    const inputs = this.form.elements;

    if (!inputs.email.value || !inputs.password.value) {
      this.setState({ error: 'All fields are required.' });
    }

    fetch(`http://localhost:8080/login`, {
      method: 'POST',
      body: JSON.stringify({
        email: inputs.email.value,
        password: inputs.password.value,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        const d = new Date();
        d.setTime(d.getTime() + 14 * 24 * 60 * 60 * 1000);
        document.cookie = `${TOKEN_KEY}=${data.token};expires=${d.toUTCString()};path=/`;
        window.location.pathname = '/admin';
      })
      .catch(err => {
        this.setState({ error: err.message });
      });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <PageWrapper>
          <Content>
            <Title>HELLO</Title>
            {this.state.error && <Message text={this.state.error} />}
            <Form
              method="post"
              innerRef={form => {
                this.form = form;
              }}
              onSubmit={e => {
                e.preventDefault();

                this.submitForm(e);
              }}
            >
              <Label htmlFor="email">Email</Label>
              <Input type="text" name="email" />
              <Label htmlFor="password">Password</Label>
              <Input type="password" name="password" />
              <Button type="submit">Log In</Button>
            </Form>
          </Content>
        </PageWrapper>
      </ThemeProvider>
    );
  }
}