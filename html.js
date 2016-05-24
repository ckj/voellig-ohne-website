import React from 'react'
import DocumentTitle from 'react-document-title'
import { prefixLink } from 'gatsby-helpers'

require('file?name=.htaccess!./.htaccess')

module.exports = React.createClass({
    propTypes () {
        return {
            title: React.PropTypes.string,
        }
    },
    render () {
        const title = DocumentTitle.rewind()

        let css
        if (process.env.NODE_ENV === 'production') {
            css = <link rel="stylesheet" href={prefixLink('/styles.css')} />
        //    css = <style dangerouslySetInnerHTML={{ __html: require('!raw!./public/styles.css') }} />
        }

        return (
            <html lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0 maximum-scale=1.0, user-scalable=no" />
                    <meta name="description" content="völlig ohne. Entwickelt, gestaltet, setzt um. Bürogemeinschaft in Berlin." />
                    <title>{title}</title>
                    <link rel="shortcut icon" href={'/favicon.png'} />
                    {css}
                </head>
                <body>
                    <div id="react-mount" dangerouslySetInnerHTML={{ __html: this.props.body }} />
                    <script src={prefixLink('/bundle.js')} />
                </body>
            </html>
        )
    },
})
