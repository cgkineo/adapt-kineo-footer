import Adapt from 'core/js/adapt';

export default class FooterView extends Backbone.View {

  tagName() { return 'footer'; }

  className() { return 'footer'; }

  initialize() {
    const footer = this.model.get('_footer');
    if (!footer?._isEnabled) return;
    this.setUpCourseContentInheritance();
    this.hideUntilTrickleEnded();
    this.render();
  }

  setUpCourseContentInheritance() {
    const footer = this.model.get('_footer');
    if (footer._footerContent) return;
    // Inherit from the course.json
    footer._footerContent = Adapt.course.get('_footer')._footerContent;
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
    this.$el.addClass(this.model.get('_footer')._classes);
  }

}
