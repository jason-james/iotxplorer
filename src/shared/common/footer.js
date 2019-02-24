// @flow

import {styled} from 'styletron-inferno';
import {t} from '../../lib/iso-i18n';
import {fonts} from './styles/style-font';
import {colors} from './styles/style-color';
import {colorHover} from './color-hover';
import {assetURL} from '../../lib/asset-url'

const IOTXPLORER_LINK = 'https://www.iotxplorer.io/';
const MEDIUM_LINK = 'https://medium.com/iotxplorer';
const TELEGRAM_LINK = 'https://t.me/iotxplorer';
const TWITTER_LINK = 'https://twitter.com/iotxplorer';
const GITHUB_LINK = 'https://github.com/iotxplorer';

export function Footer() {
  return (
    <FooterStyle className='footer'>
      <div className='container'>
        <div className='content has-text-centered'>
          <div className='columns'>
            <div className='column is-one-third'>
            <p className='heading' style={{width:'60%', marginLeft:'54px', fontSize:'15px'}}>Stay Updated</p>

              <form
              action='//iotxplorer.us20.list-manage.com/subscribe/post?u=6e080e4562ed541d1f6636917&amp;id=01b0eb8ba6'
              method='post'
              id='mc-embedded-subscribe-form'
              name='mc-embedded-subscribe-form'
              className='validate'
              target='_blank'
              noValidate={false}
              >
              <p class="control has-icons-left">
              <input
                type='email'
                className='input'
                aria-label='Email'
                id='mce-EMAIL'
                name='EMAIL'
                placeholder='Email'
                required={true}
                style={{width:'180px', marginLeft:'125px'}}
              />
              <span class="icon is-small is-left" style={{marginLeft:'125px'}}>
              <i class="fas fa-envelope"></i>
              </span>
              </p>
              <input type='hidden' name='b_6e080e4562ed541d1f6636917_01b0eb8ba6' tabIndex='-1' value=''/>
              <button className='button is-outlined is-primary' style={{width:'180px'}}>SUBSCRIBE</button>
            </form>
            </div>
            <div className='column is-one-third'>
            <p>© 2019 iotxplorer</p>
            <img src={assetURL('/favicon.png')} width='88px' height='100px'/>
            </div>
            <div className='column is-one-third'>
            <p className='heading' style={{width:'60%', marginLeft:'52px', fontSize:'15px'}}>Connect</p>

                <LinkStyle href={MEDIUM_LINK}><FooterIcon className='fab fa-medium'/></LinkStyle>
                <LinkStyle href={TELEGRAM_LINK}><FooterIcon className='fab fa-telegram-plane'/></LinkStyle>
                <LinkStyle href={TWITTER_LINK}><FooterIcon className='fab fa-twitter-square'/></LinkStyle>
                <LinkStyle href={GITHUB_LINK}><FooterIcon className='fab fa-github-square'/></LinkStyle>
            </div>
          </div>
        </div>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled('footer', props => ({
  ...fonts.body,
  backgroundColor: '#363636',
  color: colors.inverse01,
}));

const LinkStyle = styled('a', props => ({
  paddingLeft: '5px',
  paddingRight: '5px',
  cursor: 'pointer',
  ...colorHover(colors.inverse01, colors.brand02),
}));

const FooterIcon = styled('i', props => ({
  color: '00d1b2',
  fontSize: '2em',
  cursor: 'pointer',
  ...colorHover(colors.brand02, colors.brand02),
}));
