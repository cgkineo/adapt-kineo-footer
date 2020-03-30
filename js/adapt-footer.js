define(function(require) {

  var Adapt = require('coreJS/adapt');
  var Backbone = require('backbone');

  var footerView = Backbone.View.extend({

    className: 'footer',

    initialize: function() {
    var footer = this.model.get('_footer');

    if (!footer || !footer._isEnabled) return;
      this.render();
    },

    render: function() {
      var data = this.model.toJSON();
      var template = Handlebars.templates['footer'];

      this.$el.html(template(data))
      _.defer(_.bind(this.postRender, this));
    },

    postRender: function() {
      this.listenTo(Adapt, 'remove', this.remove);
      this.$el.addClass(this.model.get('_footer')._classes);
    }

  });

  Adapt.on('app:dataReady', function() {
    if (!Adapt.course.get("_footer")) return;

    Adapt.on('menuView:ready pageView:ready', function(view) {
      new footerView({
        model: view.model
      }).$el.appendTo(view.$el);
    });
  });

});
