import { h, render } from './vdom';
import { Component } from './component';
import { router } from './router';
import { createStore } from './store';
import { formatJSON, mediaQuery } from './utils';

export default {
  h,
  render,
  Component,
  router,
  createStore,
  formatJSON,
  mediaQuery
};

export { h, render, Component, router, createStore, formatJSON, mediaQuery };
