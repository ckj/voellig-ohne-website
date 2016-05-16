import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import sternchen from 'pages/sternchen.svg'
import Header from 'pages/components/_header.js'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import NextPrev from 'pages/projekte/_next-prev.js'

import './project-list.less'

module.exports = React.createClass({
    propTypes () {
        return {
            children: React.PropTypes.any,
        }
    },
    render () {
        const projectList = [];
        const currentPath = '/projekte/'
        let classNames = 'vo_project_list-item';

        const projects = this.props.route.pages.filter((page) => {
            return page.path.substr(0, currentPath.length) === currentPath && page.path !== currentPath
        })

        // classNames += shouldAnimate(currentPath) ? ' animate' : ''

        projects.forEach((page) => {
            const subDir = page.path.replace(currentPath, '')
            const responsiveImage = require('responsive?sizes[]=500,sizes[]=1000,sizes[]=2000,quality=75!./' + subDir + page.data.mainImage + '.jpg')
            const srcSet = generateSrcSet(responsiveImage.images)
            let gallery;
            let classNamesItem = classNames;

            const backgroundImage = {
                backgroundImage: `url(${page.path}${page.data.mainImage})`
            }

            if (this.props.location.pathname !== currentPath) {
                classNamesItem += (this.props.location.pathname === page.path) ? ' active' : ' passive';
            } else {
                classNamesItem += ' listed'
            }

            if (page.data.images && this.props.location.pathname === page.path) {
                const galleryImages = page.data.images.map((image) => {
                    const responsiveImage = require('responsive?sizes[]=500,sizes[]=1000,sizes[]=2000!./' + subDir + image + '.jpg')

                    return (
                        <li key={image}>
                            <img srcSet={generateSrcSet(responsiveImage.images)} src={generateSrc(responsiveImage)} />
                        </li>
                    )
                })

                const nextProject = projects.find((project, index, projects) => {
                    const prevIndex = mod((index - 1), projects.length)
                    return page.path === projects[prevIndex].path
                })

                const prevProject = projects.find((project, index, projects) => {
                    const prevIndex = mod((index + 1), projects.length)
                    return page.path === projects[prevIndex].path
                })

                gallery = (
                    <footer>
                        <ul className="vo_project_gallery">
                            {galleryImages}
                        </ul>

                        <NextPrev next={nextProject} prev={prevProject} />
                    </footer>
                )
            }

            projectList.push(
                <li className={classNamesItem}
                    key={page.path}>
                    <Link to={prefixLink(page.path)}
                        className="vo_project_list-link">
                        mehr infos
                    </Link>
                    <img srcSet={srcSet} src={generateSrc(responsiveImage)} className="vo_project_list-main_image"/>
                    <div className="vo-section_wrapper">
                        <div className="vo_project_list-section vo-section vo-section--half">
                            <h2>{page.data.title}</h2>
                            <div>{page.data.description}</div>
                            <div className="vo-trenner"/>
                            <div>{page.data.date}</div>
                            <div>{page.data.what}</div>
                            <div className="vo-trenner"/>
                            <div>{page.data.what2}</div>
                            <div className="vo_project-full_text">
                                <div className="vo-trenner"/>
                                <div className="vo_project_list-body"
                                    dangerouslySetInnerHTML={{ __html: page.data.body }}>
                                </div>
                            </div>
                        </div>
                    </div>

                    {gallery}

                </li>
            )
        })

        return (
            <DocumentTitle title={`${config.siteTitle} | projekte`}>
                <main>
                    <ul className="vo_project_list">
                        {projectList}
                    </ul>
                </main>
            </DocumentTitle>
        )
    },
})

function generateSrcSet(srcset) {
    const linkPrefix = (process.env.NODE_ENV === 'production') ? '/' : '';

    return srcset.map((image) => {
        return linkPrefix + prefixLink(image.path) + ' ' + image.width + 'w'
    }).join(', ')
}

function generateSrc(responsiveImage) {
    const linkPrefix = (process.env.NODE_ENV === 'production') ? '/' : '';
    return linkPrefix + responsiveImage.images[1].path
}

function mod(n, m) {
        return ((n % m) + m) % m;
}

// function shouldAnimate(basePath) {
//     return !!window.lastPath && window.lastPath.startsWith(basePath)
// }
