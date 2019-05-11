import { h, render } from './vdom';
import { Component } from './component';
import { router } from './router';
import { store } from './store';
import { formatJSON } from './utils';

export default {
  h,
  render,
  Component,
  router,
  store,
  formatJSON
};

export { h, render, Component, router, store, formatJSON };
