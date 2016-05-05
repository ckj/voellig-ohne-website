import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import sternchen from 'pages/sternchen.svg'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },
    render () {
        return (
            <nav className="vo-header">
                <Link to={prefixLink('/')} className="vo-sternchen"
                    dangerouslySetInnerHTML={{ __html: sternchen }}>
                </Link>
                <Link to={prefixLink('/projekte/')}
                    activeClassName="vo-link-active">
                    projekte
                </Link>
            </nav>
        )
    },
})
