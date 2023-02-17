import { createElement } from '../../../util/index.js';
import APP_STORES from '../../../constants/appStores.js';
import ASSURANCES from '../../../constants/assurances.js';
import SOCIAL_MEDIA from '../../../constants/socialMedia.js';
import {
    COPYRIGHT,
    DISCLAIMER,
} from '../../../constants/general.js';

function renderFooter() {
    return createElement({
        tag: 'footer',
        classes: ['margin-top-10', 'padding-bottom-1'],
        children: [
            renderAssurances(),
            renderDisclaimer(),
            renderCompanyInfo()
        ]
    });
}

function renderAssurances() {
    return createElement({
        tag: 'section',
        classes: ['flex', 'flex-justify-content-space-around'],
        children: ASSURANCES.map(renderAssuranceCard)
    });
}

function renderAssuranceCard({ name, image, description }) {
    return createElement({
        tag: 'div',
        classes: [
            'text-align-center',
            'padding-y-2',
            'padding-x-1',
            'border-1',
            'border-solid',
            'border-grey',
            'width-80'
        ],
        children: [
            createElement({
                tag: 'img',
                classes: 'width-40',
                attributes: {
                    src: image,
                    alt: name
                }
            }),
            createElement({
                tag: 'h3',
                classes: ['bold', 'margin-bottom-2'],
                children: name
            }),
            createElement({
                tag: 'p',
                children: description
            })
        ]
    });
}

function renderDisclaimer() {
    return createElement({
        tag: 'section',
        classes: ['width-per-80', 'margin-y-3', 'margin-x-auto', 'text-align-center'],
        children: [
            createElement({
                tag: 'p',
                children: DISCLAIMER
            })
        ]
    });
}

function renderCompanyInfo() {
    return createElement({
        tag: 'section',
        classes: [
            'flex',
            'flex-justify-content-space-around',
            'flex-align-items-center'
        ],
        children: [
            renderCopyright(),
            renderAppStores(),
            renderSocial()
        ]
    });
}

function renderCopyright() {
    return createElement({
        tag: 'p',
        classes: ['width-100'],
        children: COPYRIGHT
    });
}

function renderAppStores() {
    return createElement({
        tag: 'div',
        classes: ['flex', 'flex-align-items-center', 'flex-gap-1'],
        children: [
            createElement({
                tag: 'p',
                children: 'Download App'
            }),
            ...APP_STORES.map(({ image, name }) => (
                createElement({
                    tag: 'img',
                    classes: ['width-40'],
                    attributes: {
                        src: image,
                        alt: name
                    }
                })
            ))
        ]
    });
}

function renderSocial() {
    const socialLnks = SOCIAL_MEDIA.map(data => (
        createElement({
            tag: 'li',
            children: [
                renderSocialLink(data)
            ]
        })
    ));

    return createElement({
        tag: 'nav',
        children: [
            createElement({
                tag: 'ul',
                classes: [
                    'list-style-type-none',
                    'flex',
                    'flex-justify-content-center',
                    'flex-gap-1'
                ],
                children: socialLnks
            })
        ]
    });
}

function renderSocialLink({ href, ...rest }) {
    return createElement({
        tag: 'a',
        classes: ['link'],
        children: [
            renderSocialIcon(rest)
        ],
        attributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
            href
        }
    });
}

function renderSocialIcon({ name, image: src }) {
    return createElement({
        tag: 'img',
        classes: ['width-16'],
        attributes: {
            src,
            alt: name
        }
    });
}

export default renderFooter;