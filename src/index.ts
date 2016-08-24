import './services/index'
import './template/index'

import * as u from 'utilities';
import * as d from './decorators';
export const utils = u;
export const decorators = d;
export * from './stick';
export * from 'collection';
export var ready = u.domReady();
export * from './services/index';
import {Repository} from './repository'


import *  as templ from './template/index'

export const template = templ;
export * from './template/index';