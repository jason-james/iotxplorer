// @flow

import {styled} from 'styletron-inferno';
import {t} from '../../lib/iso-i18n';
import {fonts} from './styles/style-font';
import {colors} from './styles/style-color';
import {colorHover} from './color-hover';

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
              <LinkStyle href={IOTXPLORER_LINK}>{t('footer.website')}</LinkStyle>
              <LinkStyle href={MEDIUM_LINK}>{t('footer.blog')}</LinkStyle>
              <LinkStyle href={TELEGRAM_LINK}>{t('footer.chat')}</LinkStyle>
            </div>
            <div className='column is-one-third'><p>© 2018 iotxplorer</p></div>
            <div className='column is-one-third'>
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
  backgroundColor: colors.nav03,
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
