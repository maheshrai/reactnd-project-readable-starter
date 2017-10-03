import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

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
                    {this.props.categories.map((category, i) =>
                        <tr key={i}><td>
                            <NavLink to={'/' + category.name}>{category.name}</NavLink>
                        </td></tr>)}
                </tbody>
            </table>
        )
    }
}

export default Categories