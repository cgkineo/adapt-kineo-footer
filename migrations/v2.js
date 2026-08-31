import { describe, whereContent, whereFromPlugin, mutateContent, checkContent, updatePlugin, testStopWhere, testSuccessWhere } from 'adapt-migrations';

describe('adapt-kineo-footer - v1.1.0 > v2.0.0', async () => {
  let footers;

  whereFromPlugin('adapt-kineo-footer - from v1.1.0', { name: 'adapt-kineo-footer', version: '<2.0.0' });

  whereContent('adapt-kineo-footer - where _footer is present', async content => {
    footers = content.filter(({ _footer }) => Boolean(_footer)).map(({ _footer }) => _footer);
    return footers.length;
  });

  mutateContent('adapt-kineo-footer - add _footer._horizontalAlignment', async () => {
    footers.forEach(footer => {
      footer._horizontalAlignment = 'start';
    });
    return true;
  });

  mutateContent('adapt-kineo-footer - add _footer._verticalAlignment', async () => {
    footers.forEach(footer => {
      footer._verticalAlignment = 'start';
    });
    return true;
  });

  mutateContent('adapt-kineo-footer - add _footer._graphic', async () => {
    footers.forEach(footer => {
      footer._graphic = { src: '', alt: '', _orientation: 'horizontal' };
    });
    return true;
  });

  checkContent('adapt-kineo-footer - check _footer._horizontalAlignment attribute', async () => {
    const isValid = footers.every(footer => footer._horizontalAlignment === 'start');
    if (!isValid) throw new Error('adapt-kineo-footer - _horizontalAlignment not added to every instance of _footer');
    return true;
  });

  checkContent('adapt-kineo-footer - check _footer._verticalAlignment attribute', async () => {
    const isValid = footers.every(footer => footer._verticalAlignment === 'start');
    if (!isValid) throw new Error('adapt-kineo-footer - _verticalAlignment not added to every instance of _footer');
    return true;
  });

  checkContent('adapt-kineo-footer - check _footer._graphic attribute', async () => {
    const isValid = footers.every(footer => footer._graphic && footer._graphic.src === '' && footer._graphic.alt === '' && footer._graphic._orientation === 'horizontal');
    if (!isValid) throw new Error('adapt-kineo-footer - _graphic not added to every instance of _footer');
    return true;
  });

  updatePlugin('adapt-kineo-footer - update to v2.0.0', { name: 'adapt-kineo-footer', version: '2.0.0', framework: '>=5.8' });

  testSuccessWhere('course and contentobject with _footer already present', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '1.1.0' }],
    content: [
      { _type: 'course', _footer: { _isEnabled: true, _footerContent: 'Copyright', _classes: '' } },
      { _type: 'page', _footer: { _isEnabled: true } },
      { _type: 'menu', _footer: { _isEnabled: false } }
    ]
  });

  testSuccessWhere('only course has _footer', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '1.1.0' }],
    content: [
      { _type: 'course', _footer: { _isEnabled: true } },
      { _type: 'page' }
    ]
  });

  testStopWhere('no _footer present anywhere', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '1.1.0' }],
    content: [
      { _type: 'course' },
      { _type: 'page' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '2.0.0' }]
  });
});

describe('adapt-kineo-footer - v2.1.0 > v2.2.0', async () => {
  let course, contentObjectFooters;

  whereFromPlugin('adapt-kineo-footer - from v2.1.0', { name: 'adapt-kineo-footer', version: '<2.2.0' });

  whereContent('adapt-kineo-footer - where contentobject _footer is present', async content => {
    course = content.find(({ _type }) => _type === 'course');
    contentObjectFooters = content.filter(({ _type, _footer }) => (_type === 'page' || _type === 'menu') && Boolean(_footer)).map(({ _footer }) => _footer);
    return contentObjectFooters.length;
  });

  mutateContent('adapt-kineo-footer - add contentobject _footer._inheritCourseConfig', async () => {
    contentObjectFooters.forEach(footer => {
      footer._inheritCourseConfig = true;
    });
    return true;
  });

  checkContent('adapt-kineo-footer - check contentobject _footer._inheritCourseConfig attribute', async () => {
    const isValid = contentObjectFooters.every(footer => footer._inheritCourseConfig === true);
    if (!isValid) throw new Error('adapt-kineo-footer - _inheritCourseConfig not added to every contentobject instance of _footer');
    const isCourseUnaffected = !course._footer || !Object.prototype.hasOwnProperty.call(course._footer, '_inheritCourseConfig');
    if (!isCourseUnaffected) throw new Error('adapt-kineo-footer - _inheritCourseConfig should not be added to the course _footer');
    return true;
  });

  updatePlugin('adapt-kineo-footer - update to v2.2.0', { name: 'adapt-kineo-footer', version: '2.2.0', framework: '>=5.8' });

  testSuccessWhere('course and contentobjects with _footer present', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '2.1.0' }],
    content: [
      { _type: 'course', _footer: { _isEnabled: true, _footerContent: 'Copyright' } },
      { _type: 'page', _footer: { _isEnabled: true } },
      { _type: 'menu', _footer: { _isEnabled: false } }
    ]
  });

  testSuccessWhere('only a page has _footer, course does not', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '2.1.0' }],
    content: [
      { _type: 'course' },
      { _type: 'page', _footer: { _isEnabled: true } }
    ]
  });

  testStopWhere('no contentobject _footer present', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '2.1.0' }],
    content: [
      { _type: 'course', _footer: { _isEnabled: true } },
      { _type: 'page' }
    ]
  });

  testStopWhere('incorrect version', {
    fromPlugins: [{ name: 'adapt-kineo-footer', version: '2.2.0' }]
  });
});
