import idGenerator from '../idGeneratorAdapter';

describe('ID Generator', () => {
  test('it returns a string id when its called', () => {
    // Act
    const id = idGenerator();

    // Assert
    expect(id).toBeDefined();
    expect(typeof id).toBe('string');
  });
  test('it returns a different id in subsequent calls', () => {
    const id1 = idGenerator();
    const id2 = idGenerator();
    expect(id1).not.toBe(id2);
  });
});
