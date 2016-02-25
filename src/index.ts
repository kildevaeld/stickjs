import './services/index'
import './template/index'

import * as u from 'utilities';
import * as d from './decorators';
export const utils = u;
export const decorators = d;
export * from './stick';
export * from 'collection';

export var ready = u.domReady();

import {Repository} from './repository'
