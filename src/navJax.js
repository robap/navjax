
goog.provide('NavJax');

goog.require('goog.History');
goog.require('goog.Uri');

/**
 * @constructor
 */
NavJax = function() {
  this.links_ = {};
  this.basePage_ = new goog.Uri(window.location.href);
  this.history_ = new goog.History();
  
  goog.events.listen(this.history_, goog.history.EventType.NAVIGATE, function(event) {
      this.handleHistory_(event);
  }, false, this);
};
goog.addSingletonGetter(NavJax);

/**
 * 
 */
NavJax.prototype.addLink = function(href, container) {
  this.links_[href] = container;
};

/**
 * 
 */
NavJax.prototype.getBasePath = function() {
  return this.basePage_.getPath();
};

/**
 * 
 */
NavJax.prototype.setToken = function(token) {
  console.log(token)
  this.history_.setToken(token);
};

/**
 * 
 */
NavJax.prototype.setEnabled = function(enabled) {
  console.log(this.getBasePath(), this.links_)
  this.history_.setEnabled(enabled);
};

/**
 * @private
 */
NavJax.prototype.handleHistory_ = function(event) {
  var container;

  var token = event.token;
  if(token == '') {
    var uri = new goog.Uri(window.location.href);
    token = uri.getPath();
  }
  
  if(token in this.links_) {
    container = this.links_[token];
    this.load_(container, token);
  }
};

/**
 * @private
 */
NavJax.prototype.load_ = function(container, url, complete) {
  $(container).load(url + ' ' + container, function() {
    
  });
};

$.fn.navJax = function(container) {
  var nj = NavJax.getInstance();
  
  var ret = this.each(function() {
    nj.addLink($(this).attr('href'), container);

    $(this).click(function(e) {
      e.preventDefault();
      nj.setToken($(e.target).attr('href'));
    });
  });
  
  nj.setEnabled(true);
  
  return ret;
};