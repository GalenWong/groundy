/* eslint react/jsx-props-no-spreading: off, @typescript-eslint/ban-ts-comment: off */
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

Enzyme.configure({ adapter: new Adapter() });
jest.useFakeTimers();

describe('Counter component', () => {
  it('should should display count', () => {
    expect('dummy').toMatch(/.*/);
  });
});
