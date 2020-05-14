define([
  'core/js/adapt'
], function(Adapt) {

  var footerView = Backbone.View.extend({

    className: 'footer',

    initialize: function() {
      var footer = this.model.get('_footer');
      if (!footer || !footer._isEnabled) return;

      // if _footerContent not specified for this page, assume we just want to copy what's in course.json
      if (!footer._footerContent) {
        footer._footerContent = Adapt.course.get('_footer')._footerContent;
      }

      this.render();
    },

    render: function() {
      var template = Handlebars.templates.footer;
      var data = this.model.toJSON();

      this.$el.html(template(data));

      _.defer(this.postRender.bind(this));
    },

    postRender: function() {
      this.listenTo(Adapt, 'remove', this.remove);

      this.$el.addClass(this.model.get('_footer')._classes);
    }

  });

  Adapt.once('app:dataReady', function() {
    if (!Adapt.course.get('_footer')) return;

    Adapt.on('menuView:ready pageView:ready', function(view) {
      new footerView({
        model: view.model
      }).$el.appendTo(view.$el);
    });
  });

});
