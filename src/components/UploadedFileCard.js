import React, { Component, PropTypes } from 'react';
import { Button } from 'react-md/lib/Buttons';
import { Card } from 'react-md/lib/Cards';

if (!global.Intl) {
  require.ensure([], require => {
    require('intl');
    require('intl/locale-data/jsonp/en-US');
  });
}

export default class UploadedFileCard extends Component {
  render() {
    const { name, size, uploadResult } = this.props.file;

    let content;
    if (size <= 2097152) {
      content = (
        <Card className="uploaded">
          <Button className="close-btn" data-name={name} raised>
            close
          </Button>
          <img alt={name} src={uploadResult} />
        </Card>
      );
    }

    return (
      <div>
        {content}
      </div>
    );
  }
}

UploadedFileCard.propTypes = {
  file: PropTypes.object,
};
