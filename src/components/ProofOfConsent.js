import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';
import FileUpload from 'react-md/lib/FileInputs/FileUpload';

import UploadedFileCard from './UploadedFileCard';
import '../assets/stylesheets/ProofOfConsent.scss';

export default class ProofOfConsent extends Component {
  constructor(props) {
    super(props);

    this.state = { files: {}, checkForUploadedFile: false };
    this.handleCloseClick = this.handleCloseClick.bind(this);
    this.handleOnLoad = this.handleOnLoad.bind(this);
    this.handleSetFile = this.handleSetFile.bind(this);
    this._setUpload = this._setUpload.bind(this);
    this._timeout = null;
  }

  componentWillUnmount() {
    if (this._timeout) {
      clearTimeout(this._timeout);
    }
  }

  _setUpload(upload) {
    this._upload = upload;
  }

  handleOnLoad(file, uploadResult) {
    const { name, size, type, lastModifiedDate } = file;
    const files = Object.assign({}, this.state.files);
    files[name] = {
      name,
      type,
      size,
      lastModified: new Date(lastModifiedDate),
      uploadResult,
    };

    this._timeout = setTimeout(() => {
      this._timeout = null;
      this.setState({ progress: null });
    }, 2000);

    if (size <= 2097152) {
      this.setState({ checkForUploadedFile: true });
    }
    this.setState({ files, progress: 100 });
    this.props.handleChange('fileName', name);
  }

  handleSetFile(file) {
    this.setState({ file });
  }

  /**
   * Removes an uploaded file if the close IconButton is clicked.
   */
  handleCloseClick(e) {
    let target = e.target;
    while (target && target.parentNode) {
      if (target.dataset.name) {
        const files = Object.assign({}, this.state.files);
        delete files[target.dataset.name];
        this.setState({ files });
        this.setState({ checkForUploadedFile: false });
        this.props.handleChange('fileName', name);
        return;
      }

      target = target.parentNode;
    }
  }

  render() {
    const { files } = this.state;
    const cards = Object.keys(files).map(key => (
      <UploadedFileCard file={files[key]} key={key} />
    ));

    return (
      <div className="file-container">
        <FileUpload
          accept="image/*"
          className="multi-file__upload"
          disabled={this.state.checkForUploadedFile ? true : false}
          id="multiFileUpload"
          label="Select consent to upload"
          name="mutlipart-file-upload"
          onLoad={this.handleOnLoad}
          onLoadStart={this.handleSetFile}
          ref={this._setUpload}
          secondary
        />
        <CSSTransitionGroup
          className="md-grid"
          component="output"
          onClick={this.handleCloseClick}
          transitionEnterTimeout={300}
          transitionLeave={false}
          transitionName="md-cross-fade"
        >
          {cards}
        </CSSTransitionGroup>
      </div>
    );
  }
}

ProofOfConsent.propTypes = {
  handleChange: PropTypes.func,
};
