import { h, render } from './vdom';
import { Component } from './component';
import { router } from './router';
import { createStore } from './store';
import { formatJSON, throttle } from './utils';

export default {
  h,
  render,
  Component,
  router,
  createStore,
  formatJSON,
  throttle
};

export { h, render, Component, router, createStore, formatJSON, throttle };
