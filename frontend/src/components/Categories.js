import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Categories extends Component {

    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    render() {
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.categories.map((category, i) => <tr key={i}><td>{category.name}</td></tr>)}
                </tbody>
            </table>
        )
    }
}

export default Categories