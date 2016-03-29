import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('flows',{path:'flows/:id'});
  this.route('flow',{path:'flow/:id'});
});

export default Router;
