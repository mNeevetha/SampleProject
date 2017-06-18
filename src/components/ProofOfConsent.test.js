import { mount } from 'enzyme';
import React from 'react';

import ProofOfConsent from './ProofOfConsent';

describe('Container: ProofOfConsent', () => {
  let proofOfConsent;
  const wrapper = mount(<ProofOfConsent />);
  proofOfConsent = wrapper.find(ProofOfConsent);

  it('renders without crashing', () => {
    expect(proofOfConsent.exists()).toBe(true);
  });

  it('Check for Button and Button label', () => {
    expect(proofOfConsent.find('.md-file-input-container').exists()).toBe(true);
    expect(proofOfConsent.find('.md-icon-text').text()).toEqual(
      'Select consent to upload'
    );
  });
});
