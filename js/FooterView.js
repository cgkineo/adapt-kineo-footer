import Adapt from 'core/js/adapt';

export default class FooterView extends Backbone.View {

  tagName() { return 'footer'; }

  className() { return 'footer'; }

  initialize() {
    this.setUpCourseContentInheritance();
    this.hideUntilTrickleEnded();
    this.render();
  }

  setUpCourseContentInheritance() {
    const footer = this.model.get('_footer');
    const footerCourseConfig = Adapt.course.get('_footer');

    if (footer._footerContent) return;
    // Inherit from the course.json
    footer._footerContent = footerCourseConfig._footerContent;
    footer._horizontalAlignment = footerCourseConfig._horizontalAlignment;
    footer._verticalAlignment = footerCourseConfig._verticalAlignment;
    footer._graphic = footerCourseConfig._graphic;
    footer._classes = footerCourseConfig._classes;
  }

  isTrickled() {
    const isTrickling = Adapt.trickle?.isTrickling;
    const isOnPage = Adapt.parentView.model.isTypeGroup('page');
    return (isTrickling && isOnPage);
  }

  hideUntilTrickleEnded() {
    if (!this.isTrickled()) return;
    this.$el.addClass('u-display-none');
    this.listenTo(Adapt, 'trickle:finished trickle:killed', this.onTrickleEnded);
  }

  onTrickleEnded() {
    this.$el.removeClass('u-display-none');
  }

  render() {
    const template = Handlebars.templates.footer;
    const data = this.model.toJSON();
    this.$el.html(template(data));
    _.defer(this.postRender.bind(this));
  }

  postRender() {
    this.listenTo(Adapt, 'remove', this.remove);
    this.addClasses();
    this.contentAlignment();
    this.logoAlignment();
  }

  addClasses() {
    const classes = this.model.get('_footer')._classes;
    this.$el.addClass(classes);
  }

  contentAlignment() {
    const footer = this.model.get('_footer');
    if (footer._horizontalAlignment) this.$el.addClass(`justify-${footer._horizontalAlignment}`);
    if (footer._verticalAlignment) this.$el.addClass(`align-${footer._verticalAlignment}`);
  }

  logoAlignment() {
    const graphic = this.model.get('_footer')._graphic;
    if (!graphic || !graphic.src) return

    this.$el.addClass('has-image');
    if (graphic._orientation === 'vertical') {
      this.$el.addClass('is-vertical')
    } else {
      this.$el.addClass('is-horizontal')
    }
  }

}
