import Adapt from 'core/js/adapt';
import FooterView from './FooterView';

Adapt.once('app:dataReady', () => {
  if (!Adapt.course.get('_footer')) return;
  Adapt.on('menuView:ready pageView:ready', view => {
    new FooterView({
      model: view.model
    }).$el.appendTo(view.$el);
  });
});
