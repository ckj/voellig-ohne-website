import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'

import './_menu.less'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },
    render () {
        const links = [
            {
                target: '/',
                title: 'völlig ohne'
            },
            {
                target: '/projekte/',
                title: 'projekte'
            },
            {
                target: '/vo/',
                title: 'uns'
            },
            {
                target: '/kontakt/',
                title: 'kontakt'
            },
            {
                target: '/neuigkeiten/',
                title: 'neuigkeiten'
            }
        ]

        const renderedLinks = links.map((link) => {
            return (
                <li key={link.target}>
                    <Link to={prefixLink(link.target)}
                        className="vo_menu-link"
                        activeClassName="vo_menu-link--active">
                        {link.title}
                    </Link>
                </li>
            )
        });

        return (
            <menu className="vo_menu">
                {renderedLinks}
            </menu>
        )
    },
})
