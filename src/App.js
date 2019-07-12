import React, { Component } from 'react'
import { Fetch } from 'react-data-fetching'

import { Loader } from './components'

export default class App extends Component {
  render() {
    return (
      <Fetch
        loader={<Loader />} // Replace this with your lovely handcrafted loader
        url="https://api.github.com/users/octocat"
        timeout={5000}
      >
        {({ data }) => (
          <div>
            <h1>Username</h1>
            <p>{data.name}</p>
          </div>
        )}
      </Fetch>
    )
  }
}