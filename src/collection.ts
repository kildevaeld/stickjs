
import * as collection from 'collection'

export class Model extends collection.NestedModel {
  idAttribute = "id";
}

export class Collection extends collection.Collection<Model> {
  Model = Model;
}
