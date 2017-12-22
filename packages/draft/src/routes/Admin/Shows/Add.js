import React, { Component, Fragment } from 'react';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from 'components/Loading';
import Message from 'components/Form/Message';
import Form from 'routes/Admin/Form';
import { Heading, FormWrap } from 'routes/Admin/styled';
import showFields from './showFields';

/* eslint-disable react/prop-types */

@compose(
  graphql(gql`
    query CreateShowQuery {
      artists: terms(taxonomy: "artist", first: 100) {
        taxonomy {
          id
        }
        edges {
          node {
            id
            name
          }
        }
      }
      venues: terms(taxonomy: "venue", first: 100) {
        taxonomy {
          id
        }
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `),
  graphql(gql`
    mutation CreateShowMutation($input: CreateShowInput!) {
      createShow(input: $input) {
        id
      }
    }
  `)
)
export default class AddShow extends Component {
  state = {
    message: null,
  };

  onSubmit = (e, updates) => {
    e.preventDefault();

    this.props
      .mutate({
        variables: {
          input: updates,
        },
      })
      .then(({ data: { createShow } }) => {
        this.props.history.push({
          pathname: `/show/${createShow.id}`,
        });
      })
      .catch(() => this.setState({ message: 'error' }));
  };

  render() {
    const { data: { loading, artists, venues } } = this.props;

    if (loading && !artists) {
      return <Loading />;
    }

    return (
      <Fragment>
        <Heading>Add Show</Heading>
        {this.state.message === 'error' && <Message text="Error adding show." />}
        <FormWrap>
          <Form
            fields={showFields({ artists, venues })}
            buttonLabel="Add Show"
            onSubmit={this.onSubmit}
          />
        </FormWrap>
      </Fragment>
    );
  }
}