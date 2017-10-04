import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import addImg from '../add.svg';

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
                        <th>Add Post</th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.categories.map((category, i) =>
                        <tr key={i}><td>
                            <NavLink to={'/' + category.name}>{category.name}</NavLink>
                        </td><td>
                            <NavLink to={'/' + category.name + '/new'}><img src={addImg} height="20" width="20" alt="Click to add Post" title="Click to add Post" /></NavLink>
                        </td></tr>)}
                </tbody>
            </table>
        )
    }
}

export default Categories