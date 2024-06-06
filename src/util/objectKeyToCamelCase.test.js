// eslint-disable-next-line @typescript-eslint/no-var-requires
const { objectKeyToCamelCaseRecursively } = require('./objectKeyToCamelCase');

test('Changes case of top level object keys', () => {
  const testData = {
    Foo: 'bar',
    FooFoo: 'BarBar'
  };

  expect(objectKeyToCamelCaseRecursively(testData)).toStrictEqual({
    foo: 'bar',
    fooFoo: 'BarBar'
  });
});

test('Changes case of next level object keys', () => {
  const testData = {
    Foo: 'bar',
    FooFoo: {
      bar: '1',
      FooBar: '2',
      BARFOO: '3'
    }
  };

  expect(objectKeyToCamelCaseRecursively(testData)).toStrictEqual({
    foo: 'bar',
    fooFoo: {
      bar: '1',
      fooBar: '2',
      bARFOO: '3'
    }
  });
});

test('Changes case of next level object keys in array', () => {
  const testData = {
    Foo: 'bar',
    FooFoo: [
      {
        bar: '1',
        FooBar: '2',
        BARFOO: '3'
      }
    ]
  };

  expect(objectKeyToCamelCaseRecursively(testData)).toStrictEqual({
    foo: 'bar',
    fooFoo: [
      {
        bar: '1',
        fooBar: '2',
        bARFOO: '3'
      }
    ]
  });
});
