import 'jsdom-global/register';

import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import Index from '../../src/pages/index';

import messages from '../../src/lang/en.json';

describe('<Index />', () => {
  it('Index page renders without crashing', () => {
    const component = shallow(<Index now={Date.now()} locale="en" messages={messages} />);

    expect(component.exists()).to.equal(true);
  });

  it('Index page mount without crashing', () => {
    const component = mount(<Index now={Date.now()} locale="en" messages={messages} />);

    expect(component.exists()).to.equal(true);
  });

  it('Index page have a Layout component', () => {
    const component = mount(<Index now={Date.now()} locale="en" messages={messages} />);

    expect(component.find('span').text()).to.equal('Hello, World!');
    expect(component.find('.change-locale').length).to.equal(1);
    component.find('.change-locale').simulate('click');
    expect(component.find('span').text()).to.equal('Bonjour le monde!');
  });
});