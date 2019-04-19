import {css} from '@emotion/core'
import Img from 'gatsby-image'
import asCard from './asCard'
import ExternalLink from '../ExternalLink'
import {IoLogoGithub, IoLogoTwitter, IoIosLink} from 'react-icons/io'
import {useMemo} from 'react'
import {MEDIUM_GRAY} from '~/constants'

const styles = css`
  display: flex;
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  padding: 48px 16px;
  align-items: center;

  > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;

    .gatsby-image-wrapper {
      display: flex;
      width: 80px !important;
      height: 80px !important;
      border-radius: 50%;
      overflow: hidden;
      border: 2px solid #fff;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
    }

    h4 {
      margin-top: 16px;
      color: #000;
    }

    h5 {
      margin-top: 16px;
      text-align: center;
      color: ${MEDIUM_GRAY};
      max-width: 150px;
    }
  }

  > .social-links {
    margin-top: 24px;
    display: flex;
    flex-direction: row;
    align-items: center;

    > a {
      padding: 0px 8px;

      > svg {
        -webkit-filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
        filter: drop-shadow(0px 0px 2px rgba(0, 0, 0, 0.25));
      }
    }
  }
`

export default asCard(
  ({
    Container,
    name,
    bio,
    avatar,
    github,
    twitter,
    website,
    containerStyles,
  }) => {
    const deps = [github, twitter, website]
    const showLinks = useMemo(() => !!deps.filter(Boolean).length, deps)
    const links = useMemo(
      () => [
        {
          href: github,
          size: 25,
          IconTag: IoLogoGithub,
        },
        {
          href: twitter,
          size: 27,
          IconTag: IoLogoTwitter,
        },
        {
          href: website,
          size: 25,
          IconTag: IoIosLink,
        },
      ],
      [showLinks, ...deps],
    )

    return (
      <div css={[styles, containerStyles]} className='actionable tile'>
        <Container>
          {avatar ? <Img {...avatar} /> : '[backup image]'}
          {name && <h4 className='name'>{name}</h4>}
          {bio && <h5 className='bio'>{bio}</h5>}
        </Container>
        {showLinks && (
          <div className='social-links'>
            {links.map(
              ({href, IconTag, size}) =>
                href && (
                  <ExternalLink {...{href}}>
                    <IconTag {...{size}} />
                  </ExternalLink>
                ),
            )}
          </div>
        )}
      </div>
    )
  },
)