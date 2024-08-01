// file: app/containers/MyPage/ChatPage.js

import React from 'react';
import { Helmet } from 'react-helmet';
import { PapperBlock } from 'dan-components';

class ChatPage extends React.Component {
  // eslint-disable-next-line class-methods-use-this
  render() {
    const title = 'GoArif - Best AI Data Science';
    const description = 'Best AI Data Science';
    return (
      <div>
        <Helmet>
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta property="og:title" content={title} />
          <meta property="og:description" content={description} />
          <meta property="twitter:title" content={title} />
          <meta property="twitter:description" content={description} />
        </Helmet>
        <PapperBlock title="Blank Page" desc="Some text description">
          Contentssss
        </PapperBlock>
      </div>
    );
  }
}

export default ChatPage;
