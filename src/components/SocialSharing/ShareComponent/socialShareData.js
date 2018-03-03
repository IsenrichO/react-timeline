import React from 'react';
import { generateShareIcon, ShareButtons, ShareCounts } from 'react-share';
import dedent from 'dedent';
import ThemeColors from '../../../style/theming/base/colors';
import RTLogo from '../../../../assets/images/rt-logo.svg';

export const {
  EmailShareButton,
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  VKShareButton,
  WhatsappShareButton,
} = ShareButtons;

export const {
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  OKShareCount,
  PinterestShareCount,
  RedditShareCount,
  TumblrShareCount,
  VKShareCount,
} = ShareCounts;

export const {
  email: EmailBlack,
  facebook: FacebookBlue,
  googlePlus: GooglePlusRed,
  linkedIn: LinkedInBlue,
  liveJournal: LiveJournalBlue,
  mailRu: MailRuOrange,
  okRu: OKOrange,
  pinterest: PinterestRed,
  reddit: RedditOrange,
  telegram: TelegramBlue,
  tumblr: TumblrBlue,
  twitter: TwitterBlue,
  vkRu: VKBlue,
  whatsApp: WhatsAppGreen,
} = ThemeColors.social;

// Reusable social sharing text snippets:
const socialShareHeadline = 'React-Timeline Event';
const socialShareTeaser = 'Check out my new event on React-Timeline!';

// Props common to all social media:
export const commonShareProps = {
  additionalProps: {},
  beforeOnClick() {},
  disabled: false,
  disabledStyle: {
    opacity: 0.6,
  },
  onClick() {},
  onShareWindowClose() {
    console.log('You shared this page!');
  },
  windowHeight: Math.ceil(window.innerHeight / 2),
  windowWidth: Math.ceil(window.innerWidth / 2),
};

const SocialShareMap = new Map([
  // Email:
  ['email', {
    button: EmailShareButton,
    icon: generateShareIcon('email'),
    label: {
      alt: null,
      emoji: '✉',
      formatted: 'Email',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/%28at%29.svg/50px-%28at%29.svg.png',
      hosted: null,
    },
    props: {
      body: dedent(`
        User made an event on React-Timeline and he wants to share it with you!

        Check it out at localhost:3000.
      `),
      subject: socialShareTeaser,
    },
    themeColor: EmailBlack,
    website: 'mailto:',
  }],

  // Facebook:
  ['facebook', {
    button: FacebookShareButton,
    count: FacebookShareCount,
    icon: generateShareIcon('facebook'),
    label: {
      alt: ['Facebook, Inc.', 'fb'],
      formatted: 'Facebook',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Facebook_New_Logo_%282015%29.svg/512px-Facebook_New_Logo_%282015%29.svg.png',
      hosted: 'https://static.xx.fbcdn.net/rsrc.php/v3/yz/r/rqn88jHaFCN.png',
    },
    props: {
      hashtag: '#ReactTimeline',
      quote: socialShareTeaser,
    },
    themeColor: FacebookBlue,
    website: 'https://www.facebook.com/',
  }],

  // Google+:
  ['googlePlus', {
    button: GooglePlusShareButton,
    count: GooglePlusShareCount,
    icon: generateShareIcon('google'),
    label: {
      alt: ['Google, Inc.', 'Google Plus', 'G+'],
      formatted: 'Google+',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/Logo_google%2B_2015.png',
      hosted: 'https://lh3.googleusercontent.com/-2r7nkB71SpM/AAAAAAAAAAI/AAAAAAAChPA/DDlU0DYwZ4U/s72-p-k-rw-no/photo.jpg',
      hostedTitle: 'https://ssl.gstatic.com/images/branding/lockups/2x/lockup_gplus_dark_color_88x24dp.png',
    },
    props: null,
    themeColor: GooglePlusRed,
    website: 'https://plus.google.com/',
  }],

  // LinkedIn:
  ['linkedIn', {
    button: LinkedinShareButton,
    count: LinkedinShareCount,
    icon: generateShareIcon('linkedin'),
    label: {
      alt: ['LinkedIn, Inc.', 'LI', 'in'],
      formatted: 'LinkedIn',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/LinkedIn_Logo_2013.svg/512px-LinkedIn_Logo_2013.svg.png',
      hosted: 'https://static.licdn.com/sc/h/6m22ya0r3as5388b95jkuk1mv',
    },
    props: {
      description: socialShareTeaser,
      title: socialShareHeadline,
    },
    themeColor: LinkedInBlue,
    website: 'https://www.linkedin.com/',
  }],

  // LiveJournal:
  ['liveJournal', {
    button: LivejournalShareButton,
    icon: generateShareIcon('livejournal'),
    label: {
      alt: ['LiveJournal, Inc.', 'LJ'],
      formatted: 'LiveJournal',
      native: 'Живой Журнал',
      translation: 'LiveJournal',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/en/6/6c/Livejournal-logo.png',
      hosted: 'https://l-stat.livejournal.net/img/schemius/logo.svg?v=51065',
    },
    props: {
      description: socialShareTeaser,
      title: socialShareHeadline,
    },
    themeColor: LiveJournalBlue,
    website: 'https://www.livejournal.com/',
  }],

  // Mail.Ru:
  ['mailRu', {
    button: MailruShareButton,
    icon: generateShareIcon('mailru'),
    label: {
      alt: ['mail.ru', 'Mail.Ru Group'],
      formatted: 'Mail.Ru',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Mail.Ru_Group_logo.png',
      hosted: 'https://r.mradx.net/img/98/8BEE6A.png',
    },
    props: {
      description: socialShareTeaser,
      image: RTLogo,
      title: socialShareHeadline,
    },
    themeColor: MailRuOrange,
    website: 'https://mail.ru/',
  }],

  // OK.ru:
  ['okRu', {
    button: OKShareButton,
    count: OKShareCount,
    icon: generateShareIcon('ok'),
    label: {
      alt: ['Odnoklassniki', 'ok.ru'],
      formatted: 'OK.ru',
      native: 'Одноклассники',
      translation: 'Classmates',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/0/09/Ok_new_logo.png',
      hosted: 'https://st.mycdn.me/res/i/p/anonym/logo_48x82@2x.png',
    },
    props: {
      description: socialShareTeaser,
      image: RTLogo,
      title: socialShareHeadline,
    },
    themeColor: OKOrange,
    website: 'https://ok.ru/',
  }],

  // Pinterest:
  ['pinterest', {
    button: PinterestShareButton,
    count: PinterestShareCount,
    icon: generateShareIcon('pinterest'),
    label: {
      alt: ['P'],
      formatted: 'Pinterest',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/826px-Pinterest_Logo.svg.png',
      hosted: 'https://about.pinterest.com/sites/about/themes/custom/pinterest_about/images/pinterest_logo_white@2x.png',
    },
    props: {
      description: socialShareTeaser,
      media: RTLogo,
    },
    themeColor: PinterestRed,
    website: 'https://www.pinterest.com/',
  }],

  // Reddit:
  ['reddit', {
    button: RedditShareButton,
    count: RedditShareCount,
    icon: generateShareIcon('reddit'),
    label: {
      alt: ['reddit, Inc.'],
      formatted: 'Reddit',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Reddit_logo_and_wordmark.svg/150px-Reddit_logo_and_wordmark.svg.png',
      hosted: 'https://about.reddit.com/css/images/sprite.@2x.png',
    },
    props: {
      title: socialShareHeadline,
    },
    themeColor: RedditOrange,
    website: 'https://www.reddit.com/',
  }],

  // Telegram:
  ['telegram', {
    button: TelegramShareButton,
    icon: generateShareIcon('telegram'),
    label: {
      alt: ['Telegram Messenger, LLP.'],
      formatted: 'Telegram',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png',
      hosted: 'https://telegram.org/img/t_logo.png',
    },
    props: {
      title: socialShareHeadline,
    },
    themeColor: TelegramBlue,
    website: 'https://telegram.org/',
  }],

  // Tumblr:
  ['tumblr', {
    button: TumblrShareButton,
    count: TumblrShareCount,
    icon: generateShareIcon('tumblr'),
    label: {
      alt: ['tumblr'],
      formatted: 'Tumblr',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Tumblr_Logo.svg/647px-Tumblr_Logo.svg.png',
      hosted: 'https://assets.tumblr.com/images/logo/logo_large@2x.png?v=5ff69a6c9b2fbdb20feac5fbcfa89317',
    },
    props: {
      caption: socialShareTeaser,
      tags: ['React-Timeline'],
      title: socialShareHeadline,
    },
    themeColor: TumblrBlue,
    website: 'https://www.tumblr.com/',
  }],

  // Twitter:
  ['twitter', {
    button: TwitterShareButton,
    icon: generateShareIcon('twitter'),
    label: {
      alt: ['Twitter, Inc.', 't'],
      formatted: 'Twitter',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Twitter_bird_logo_2012.svg/300px-Twitter_bird_logo_2012.svg.png',
      hosted: null,
    },
    props: {
      hashtags: ['ReactTimeline'],
      title: socialShareHeadline,
      via: 'IsenrichO', // Twitter Handle => @IsenrichO
    },
    themeColor: TwitterBlue,
    website: 'https://twitter.com/',
  }],

  // VK:
  ['vkRu', {
    button: VKShareButton,
    count: VKShareCount,
    icon: generateShareIcon('vk'),
    label: {
      alt: ['VKontakte', 'vk'],
      formatted: 'VK',
      native: 'ВКонта́кте',
      translation: 'InContact',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/VK.com-logo.svg/192px-VK.com-logo.svg.png',
      hosted: 'https://vk.com/images/svg_icons/ic_head_logo.svg',
    },
    props: {
      description: socialShareTeaser,
      image: RTLogo,
      title: socialShareHeadline,
    },
    themeColor: VKBlue,
    website: 'https://vk.com/',
  }],

  // WhatsApp:
  ['whatsApp', {
    button: WhatsappShareButton,
    icon: generateShareIcon('whatsapp'),
    label: {
      alt: ['WhatsApp, Inc.', 'WhatsApp Messenger'],
      formatted: 'WhatsApp',
    },
    logo: {
      commons: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/200px-WhatsApp.svg.png',
      hosted: 'https://www-cdn.whatsapp.net/img/v4/whatsapp-logo.svg?v=bfe2fe6',
    },
    props: {
      separator: ' | ',
      title: socialShareHeadline,
    },
    themeColor: WhatsAppGreen,
    website: 'https://www.whatsapp.com/',
  }],
]);

export default SocialShareMap;
